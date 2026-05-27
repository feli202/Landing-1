const canvas = document.getElementById('particles')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const particulas = []
const cantidad = 80
const particulasTexto = []
const estela = []
let mouseX = 0
let mouseY = 0

for (let i = 0; i < cantidad; i++) {
    particulas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radio: Math.random() * 1.5 + 0.5,
        velocidadX: (Math.random() - 0.5) * 0.4,
        velocidadY: -Math.random() * 0.6 - 0.2,
        opacidad: Math.random() * 0.6 + 0.1
    })
}

function emitirParticulasTexto() {
    const h2 = document.querySelector('.hero h2')
    if (!h2) return
    const rect = h2.getBoundingClientRect()

    for (let i = 0; i < 3; i++) {
        particulasTexto.push({
            x: rect.left + Math.random() * rect.width,
            y: rect.top + Math.random() * 10,
            radio: Math.random() * 2 + 0.5,
            velocidadX: (Math.random() - 0.5) * 1.2,
            velocidadY: -Math.random() * 2.5 - 1,
            opacidad: Math.random() * 0.7 + 0.3,
            color: Math.random() > 0.5 ? '255, 107, 43' : '255, 200, 80'
        })
    }

    if (particulasTexto.length > 200) particulasTexto.splice(0, 20)
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY

    estela.push({
        x: mouseX,
        y: mouseY,
        radio: Math.random() * 3 + 1,
        opacidad: 0.8,
        velocidadX: (Math.random() - 0.5) * 1.5,
        velocidadY: -Math.random() * 2 - 0.5
    })

    if (estela.length > 40) estela.shift()

    const hero = document.querySelector('.hero')
    const h2 = hero.querySelector('h2')
    const p = hero.querySelector('p')

    const x = (e.clientX / window.innerWidth - 0.5) * 20
    const y = (e.clientY / window.innerHeight - 0.5) * 10

    h2.style.transform = `translate(${x}px, ${y}px)`
    p.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`
})

function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particulas.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radio, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 107, 43, ${p.opacidad})`
        ctx.shadowBlur = 8
        ctx.shadowColor = `rgba(255, 107, 43, 0.8)`
        ctx.fill()

        p.x += p.velocidadX
        p.y += p.velocidadY

        if (p.y < 0) {
            p.y = canvas.height
            p.x = Math.random() * canvas.width
        }
    })

    estela.forEach((punto, i) => {
        const progreso = i / estela.length
        ctx.beginPath()
        ctx.arc(punto.x, punto.y, punto.radio * progreso, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, ${Math.floor(107 * progreso)}, 0, ${punto.opacidad * progreso})`
        ctx.shadowBlur = 15
        ctx.shadowColor = `rgba(255, 80, 0, 0.9)`
        ctx.fill()

        punto.x += punto.velocidadX
        punto.y += punto.velocidadY
        punto.opacidad -= 0.02
        punto.radio *= 0.97
    })

    ctx.beginPath()
    ctx.arc(mouseX, mouseY, 4, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(255, 200, 100, 1)'
    ctx.shadowBlur = 20
    ctx.shadowColor = 'rgba(255, 107, 43, 1)'
    ctx.fill()

    emitirParticulasTexto()

    for (let i = particulasTexto.length - 1; i >= 0; i--) {
        const p = particulasTexto[i]
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radio, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color}, ${p.opacidad})`
        ctx.shadowBlur = 10
        ctx.shadowColor = `rgba(255, 107, 43, 0.8)`
        ctx.fill()

        p.x += p.velocidadX
        p.y += p.velocidadY
        p.opacidad -= 0.012
        p.radio *= 0.98

        if (p.opacidad <= 0) particulasTexto.splice(i, 1)
    }

    requestAnimationFrame(animar)
}

animar()

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

document.body.style.cursor = 'none'

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
})