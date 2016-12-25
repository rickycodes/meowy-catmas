/* global THREE requestAnimationFrame */
(function () {
  var camera, scene, renderer
  var group, text

  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000)
  camera.position.set(0, 150, 500)
  scene = new THREE.Scene()

  var dirLight = new THREE.DirectionalLight(0xffffff, 0.125)
  dirLight.position.set(0, 0, 1).normalize()
  scene.add(dirLight)

  var pointLight = new THREE.PointLight(0xffffff, 1.5)
  pointLight.position.set(0, 100, 90)
  scene.add(pointLight)

  var theText = 'Meowy Catmas!!!'
  var hash = document.location.hash.substr(1)

  if (hash.length !== 0) {
    theText = hash
  }

  var text3d = new THREE.TextGeometry(theText, {
    size: 40,
    height: 20,
    curveSegments: 1,
    font: 'droid',
    weight: 'normal',
    style: 'normal'
  })

  text3d.computeBoundingBox()
  text3d.computeVertexNormals()

  var centerOffset = -0.5 * (text3d.boundingBox.max.x - text3d.boundingBox.min.x)

  var textMaterial = new THREE.MeshFaceMaterial([
    new THREE.MeshPhongMaterial({ color: 0x005826, shading: THREE.FlatShading })
  ])

  text = new THREE.Mesh(text3d, textMaterial)

  text.position.x = centerOffset
  text.position.y = 240
  text.position.z = 0

  text.rotation.x = 0
  text.rotation.y = Math.PI * 2

  group = new THREE.Object3D()
  group.add(text)
  scene.add(group)
  renderer = new THREE.CanvasRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.querySelector('.meow').appendChild(renderer.domElement)

  function animate () {
    requestAnimationFrame(animate)
    render()
  }

  function render () {
    group.rotation.y += 0.08
    renderer.render(scene, camera)
  }

  animate()
})()
