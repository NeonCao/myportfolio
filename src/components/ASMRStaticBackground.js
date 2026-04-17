import { useEffect, useRef } from 'react';

function ASMRStaticBackground({ className = '' }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) {
      return undefined;
    }

    const context = canvas.getContext('2d');

    if (!context) {
      return undefined;
    }

    let width = 0;
    let height = 0;
    let animationFrameId = 0;
    let particles = [];
    const mouse = { x: -1000, y: -1000 };
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const PARTICLE_COUNT = prefersReducedMotion ? 220 : 1000;
    const MAGNETIC_RADIUS = 280;
    const VORTEX_STRENGTH = 0.07;
    const PULL_STRENGTH = 0.12;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        const isGlass = Math.random() > 0.7;
        this.color = isGlass ? '240, 245, 255' : '80, 80, 85';
        this.alpha = Math.random() * 0.4 + 0.1;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.05;
        this.frictionGlow = 0;
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0 && distance < MAGNETIC_RADIUS && !prefersReducedMotion) {
          const force = (MAGNETIC_RADIUS - distance) / MAGNETIC_RADIUS;

          this.vx += (dx / distance) * force * PULL_STRENGTH;
          this.vy += (dy / distance) * force * PULL_STRENGTH;
          this.vx += (dy / distance) * force * VORTEX_STRENGTH * 10;
          this.vy -= (dx / distance) * force * VORTEX_STRENGTH * 10;
          this.frictionGlow = force * 0.7;
        } else {
          this.frictionGlow *= 0.92;
        }

        this.x += this.vx;
        this.y += this.vy;

        this.vx *= 0.95;
        this.vy *= 0.95;

        if (!prefersReducedMotion) {
          this.vx += (Math.random() - 0.5) * 0.04;
          this.vy += (Math.random() - 0.5) * 0.04;
        }

        this.rotation += this.rotationSpeed + (Math.abs(this.vx) + Math.abs(this.vy)) * 0.05;

        if (this.x < -20) this.x = width + 20;
        if (this.x > width + 20) this.x = -20;
        if (this.y < -20) this.y = height + 20;
        if (this.y > height + 20) this.y = -20;
      }

      draw() {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.rotation);

        const finalAlpha = Math.min(this.alpha + this.frictionGlow, 0.9);
        context.fillStyle = `rgba(${this.color}, ${finalAlpha})`;

        if (this.frictionGlow > 0.3) {
          context.shadowBlur = 8 * this.frictionGlow;
          context.shadowColor = `rgba(180, 220, 255, ${this.frictionGlow})`;
        }

        context.beginPath();
        context.moveTo(0, -this.size * 2.5);
        context.lineTo(this.size, 0);
        context.lineTo(0, this.size * 2.5);
        context.lineTo(-this.size, 0);
        context.closePath();
        context.fill();

        context.restore();
      }
    }

    const updateCanvasSize = () => {
      const bounds = container.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.floor(bounds.width));
      const nextHeight = Math.max(1, Math.floor(bounds.height));
      const pixelRatio = window.devicePixelRatio || 1;

      width = nextWidth;
      height = nextHeight;
      canvas.width = Math.floor(nextWidth * pixelRatio);
      canvas.height = Math.floor(nextHeight * pixelRatio);
      canvas.style.width = `${nextWidth}px`;
      canvas.style.height = `${nextHeight}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
    };

    const render = () => {
      context.fillStyle = 'rgba(10, 10, 12, 0.18)';
      context.fillRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationFrameId = window.requestAnimationFrame(render);
    };

    const updatePointer = (clientX, clientY) => {
      const bounds = container.getBoundingClientRect();
      mouse.x = clientX - bounds.left;
      mouse.y = clientY - bounds.top;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%)`;
      }
    };

    const handleMouseMove = (event) => {
      updatePointer(event.clientX, event.clientY);
    };

    const handleTouchMove = (event) => {
      if (event.touches[0]) {
        updatePointer(event.touches[0].clientX, event.touches[0].clientY);
      }
    };

    const handlePointerLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;

      if (cursorRef.current) {
        cursorRef.current.style.transform = 'translate(-100px, -100px)';
      }
    };

    const resizeObserver = new ResizeObserver(updateCanvasSize);
    resizeObserver.observe(container);

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('mouseleave', handlePointerLeave);
    container.addEventListener('touchend', handlePointerLeave);

    updateCanvasSize();
    render();

    return () => {
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('mouseleave', handlePointerLeave);
      container.removeEventListener('touchend', handlePointerLeave);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden bg-[#0a0a0c] ${className}`.trim()}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
      <div
        ref={cursorRef}
        className="pointer-events-none absolute left-0 top-0 z-10 h-4 w-4 rounded-full border border-white/20 transition-transform duration-75 ease-out"
        style={{ transform: 'translate(-100px, -100px)' }}
      />
    </div>
  );
}

export default ASMRStaticBackground;
