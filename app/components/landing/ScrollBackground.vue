<script setup>
// Particle system configuration
const particleConfig = {
  particles: [],
  numParticles: 50,
  maxConnections: 5,
  connectionThreshold: 150,
  baseSpeed: 0.2,
  canvas: null,
  ctx: null,
  width: 0,
  height: 0,
  density: 1, // Default density
  hoverArea: {
    x: null,
    y: null,
    active: false
  }
}

// Initialize particle system
function initParticles() {
  console.log('test')
  const container = document.getElementById('particle-container')
  particleConfig.canvas = document.createElement('canvas')
  container.appendChild(particleConfig.canvas)
  particleConfig.ctx = particleConfig.canvas.getContext('2d')

  // Set canvas size
  resizeCanvas()
  // window.addEventListener('resize', resizeCanvas)

  // Create particles
  createParticles()

  // Start animation loop
  animateParticles()

  // Add mouse interaction
  // document.addEventListener('mousemove', handleMouseMove)
  // document.addEventListener('mouseleave', handleMouseLeave)

  // Add refresh button interaction
  // document.getElementById('data-refresh-btn').addEventListener('click', handleDataRefresh)
}

function resizeCanvas() {
  particleConfig.width = window.innerWidth
  particleConfig.height = window.innerHeight
  particleConfig.canvas.width = particleConfig.width
  particleConfig.canvas.height = particleConfig.height
}

function createParticles() {
  particleConfig.particles = []

  for (let i = 0; i < particleConfig.numParticles; i++) {
    particleConfig.particles.push({
      x: Math.random() * particleConfig.width,
      y: Math.random() * particleConfig.height,
      radius: Math.random() * 2 + 1,
      color: `rgba(212,175,55, ${Math.random() * 0.2 + 0.05})`,
      speedX: (Math.random() - 0.5) * particleConfig.baseSpeed,
      speedY: (Math.random() - 0.5) * particleConfig.baseSpeed,
      connections: 0
    })
  }
}

function animateParticles() {
  particleConfig.ctx.clearRect(0, 0, particleConfig.width, particleConfig.height)

  // Update particle positions and draw connections
  updateAndDrawParticles()

  requestAnimationFrame(animateParticles)
}

function updateAndDrawParticles() {
  // First pass: update positions
  particleConfig.particles.forEach((particle) => {
    // Reset connection count
    particle.connections = 0

    // Apply density factor to speed if near hover area
    let speedMultiplier = 1
    if (particleConfig.hoverArea.active) {
      const dx = particle.x - particleConfig.hoverArea.x
      const dy = particle.y - particleConfig.hoverArea.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 100) {
        speedMultiplier = particleConfig.density * (1 + (100 - distance) / 100)
      }
    }

    // Update position
    particle.x += particle.speedX * speedMultiplier
    particle.y += particle.speedY * speedMultiplier

    // Bounce off walls
    if (particle.x < 0 || particle.x > particleConfig.width) {
      particle.speedX *= -1
    }
    if (particle.y < 0 || particle.y > particleConfig.height) {
      particle.speedY *= -1
    }

    // Draw particle
    particleConfig.ctx.beginPath()
    particleConfig.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
    particleConfig.ctx.fillStyle = particle.color
    particleConfig.ctx.fill()
  })

  // Second pass: draw connections
  particleConfig.ctx.strokeStyle = 'rgba(100, 170, 255, 0.05)'
  particleConfig.ctx.lineWidth = 0.5

  for (let i = 0; i < particleConfig.particles.length; i++) {
    const particleA = particleConfig.particles[i]

    for (let j = i + 1; j < particleConfig.particles.length; j++) {
      const particleB = particleConfig.particles[j]

      // Skip if either particle has too many connections
      if (particleA.connections >= particleConfig.maxConnections
        || particleB.connections >= particleConfig.maxConnections) {
        continue
      }

      const dx = particleA.x - particleB.x
      const dy = particleA.y - particleB.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < particleConfig.connectionThreshold) {
        // Calculate opacity based on distance
        const opacity = 1 - (distance / particleConfig.connectionThreshold)

        particleConfig.ctx.beginPath()
        particleConfig.ctx.moveTo(particleA.x, particleA.y)
        particleConfig.ctx.lineTo(particleB.x, particleB.y)
        particleConfig.ctx.strokeStyle = `rgba(100, 170, 255, ${opacity * 0.1})`
        particleConfig.ctx.stroke()

        // Increment connection count
        particleA.connections++
        particleB.connections++
      }
    }
  }
}

function handleMouseMove(e) {
  particleConfig.hoverArea.x = e.clientX
  particleConfig.hoverArea.y = e.clientY
  particleConfig.hoverArea.active = true
}

function handleMouseLeave() {
  particleConfig.hoverArea.active = false
}

function handleDataRefresh() {
  // Increase particle density temporarily
  particleConfig.density = 3

  // Animate the refresh button
  const refreshBtn = document.getElementById('data-refresh-btn')
  refreshBtn.querySelector('i').classList.add('pulse-animation')

  // Generate new data for charts
  updateChartData()

  // Reset particle density after animation completes
  setTimeout(() => {
    particleConfig.density = 1
    refreshBtn.querySelector('i').classList.remove('pulse-animation')
  }, 2000)
}

function updateChartData() {
  // Update bar chart with new random data
  const bars = document.querySelectorAll('.bar')
  bars.forEach((bar) => {
    const newHeight = 30 + Math.random() * 60 // Between 30% and 90%
    const newValue = (Math.floor(Math.random() * 30) + 10) + '.' + Math.floor(Math.random() * 10) + 'K'

    // Animate height change
    bar.style.height = newHeight + '%'
    bar.querySelector('.bar-value').textContent = '$' + newValue
  })

  // Update donut chart
  const newValue = Math.floor(Math.random() * 30) + 60 // Between 60% and 90%
  const donutValue = document.querySelector('.donut-value')
  donutValue.textContent = newValue + '%'

  // Update donut segment rotation
  const segment = document.querySelectorAll('.segment')[1]
  segment.style.transform = `rotate(${newValue * 3.6}deg)`

  // Update metrics with new random data
  const metricValues = document.querySelectorAll('.metric-value')
  const metricChanges = document.querySelectorAll('.metric-change')

  // Conversion rate update
  const newConversionRate = (3 + Math.random() * 1.5).toFixed(2)
  metricValues[0].textContent = newConversionRate + '%'

  const conversionChange = (Math.random() * 0.8).toFixed(1)
  const conversionDirection = Math.random() > 0.5
  metricChanges[0].textContent = (conversionDirection ? '+' : '-') + conversionChange + '% '
  metricChanges[0].innerHTML += `<span style="margin-left: 5px;">${conversionDirection ? '↑' : '↓'}</span>`
  metricChanges[0].className = 'metric-change ' + (conversionDirection ? 'positive' : 'negative')

  // Other metrics updated similarly
  // Could expand this for the remaining metrics with more specific business logic
}

// Initialize donut chart animation
function initDonutChart() {
  const segments = document.querySelectorAll('.segment')

  // Apply animations with slight delay
  setTimeout(() => {
    segments[0].style.transform = 'rotate(0deg)'
    segments[1].style.transform = 'rotate(245deg)'
  }, 300)
}

onMounted(() => {
  initParticles()
  initDonutChart()
})
</script>

<template>
  <div id="particle-container" />
</template>

<style scoped>
        #particle-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
        }

        .dashboard-container {
            width: 100%;
            height: 100%;
            padding: 20px;
            display: flex;
            flex-direction: column;
            position: relative;
            z-index: 2;
        }

        .dashboard-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .dashboard-title {
            font-size: 24px;
            font-weight: 600;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .date-selector {
            background: rgba(255, 255, 255, 0.08);
            border-radius: 8px;
            padding: 8px 12px;
            border: 1px solid rgba(255, 255, 255, 0.12);
            display: flex;
            align-items: center;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .date-selector:hover {
            background: rgba(255, 255, 255, 0.15);
        }

        .date-selector span {
            margin-right: 8px;
            font-size: 14px;
            opacity: 0.9;
        }

        .date-selector i {
            font-size: 16px;
            opacity: 0.7;
        }

        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }

        .metric-card {
            background: rgba(255, 255, 255, 0.06);
            border-radius: 12px;
            padding: 20px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }

        .metric-card:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .metric-card::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, #4a8cff, #73b0ff);
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.4s ease;
        }

        .metric-card:hover::after {
            transform: scaleX(1);
        }

        .metric-label {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 10px;
        }

        .metric-value {
            font-size: 28px;
            font-weight: 600;
            margin-bottom: 5px;
        }

        .metric-change {
            font-size: 14px;
            display: flex;
            align-items: center;
        }

        .positive {
            color: #5cd6a0;
        }

        .negative {
            color: #ff6b6b;
        }

        .charts-container {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 20px;
            flex-grow: 1;
        }

        .chart-card {
            background: rgba(255, 255, 255, 0.04);
            border-radius: 12px;
            padding: 20px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            display: flex;
            flex-direction: column;
            transition: all 0.3s ease;
        }

        .chart-card:hover {
            background: rgba(255, 255, 255, 0.08);
        }

        .chart-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }

        .chart-title {
            font-size: 16px;
            font-weight: 500;
        }

        .chart-legend {
            display: flex;
            gap: 15px;
        }

        .legend-item {
            display: flex;
            align-items: center;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.7);
        }

        .legend-color {
            width: 10px;
            height: 10px;
            border-radius: 2px;
            margin-right: 6px;
        }

        .chart-container {
            flex-grow: 1;
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .actions-container {
            margin-top: auto;
            display: flex;
            justify-content: flex-end;
            gap: 10px;
        }

        .action-button {
            background: rgba(255, 255, 255, 0.1);
            border: none;
            border-radius: 6px;
            padding: 8px 15px;
            color: white;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
        }

        .action-button i {
            margin-right: 6px;
            font-size: 16px;
        }

        .action-button:hover {
            background: rgba(255, 255, 255, 0.2);
        }

        .primary-button {
            background: linear-gradient(90deg, #4a8cff, #73b0ff);
        }

        .primary-button:hover {
            background: linear-gradient(90deg, #5a95ff, #80b8ff);
        }

        #data-refresh-btn {
            position: relative;
        }

        #data-refresh-btn i {
            transition: transform 0.5s ease;
        }

        #data-refresh-btn:hover i {
            transform: rotate(180deg);
        }

        .bar-chart {
            width: 100%;
            height: 200px;
            display: flex;
            align-items: flex-end;
            gap: 15px;
            padding-top: 20px;
        }

        .bar {
            flex-grow: 1;
            background: linear-gradient(to top, rgba(74, 140, 255, 0.8), rgba(115, 176, 255, 0.3));
            border-radius: 4px 4px 0 0;
            position: relative;
            transition: height 0.5s ease;
            cursor: pointer;
        }

        .bar:hover {
            background: linear-gradient(to top, rgba(90, 155, 255, 0.9), rgba(130, 186, 255, 0.4));
        }

        .bar-label {
            position: absolute;
            bottom: -25px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 12px;
            color: rgba(255, 255, 255, 0.7);
            white-space: nowrap;
        }

        .bar-value {
            position: absolute;
            top: -25px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 12px;
            color: rgba(255, 255, 255, 0.9);
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .bar:hover .bar-value {
            opacity: 1;
        }

        .donut-chart {
            width: 160px;
            height: 160px;
            position: relative;
        }

        .donut-hole {
            width: 70%;
            height: 70%;
            border-radius: 50%;
            background: rgba(26, 36, 54, 0.7);
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }

        .donut-value {
            font-size: 22px;
            font-weight: 600;
            margin-bottom: 5px;
        }

        .donut-label {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.7);
        }

        .segment {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            clip: rect(0px, 160px, 160px, 80px);
        }

        .insights-list {
            padding: 10px 0;
        }

        .insight-item {
            display: flex;
            padding: 10px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .insight-item:last-child {
            border-bottom: none;
        }

        .insight-item:hover {
            background: rgba(255, 255, 255, 0.05);
            padding-left: 5px;
        }

        .insight-icon {
            width: 30px;
            height: 30px;
            background: rgba(74, 140, 255, 0.2);
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 12px;
            flex-shrink: 0;
        }

        .insight-icon i {
            color: #4a8cff;
            font-size: 14px;
        }

        .insight-content {
            flex-grow: 1;
        }

        .insight-title {
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 4px;
        }

        .insight-desc {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.6);
        }

        @media (max-width: 900px) {
            .charts-container {
                grid-template-columns: 1fr;
            }
        }

        @media (max-width: 600px) {
            .metrics-grid {
                grid-template-columns: 1fr 1fr;
            }

            .dashboard-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 10px;
            }
        }

        @keyframes pulse {
            0% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.05); opacity: 0.9; }
            100% { transform: scale(1); opacity: 0.7; }
        }

        .pulse-animation {
            animation: pulse 2s infinite ease-in-out;
        }
    </style>
