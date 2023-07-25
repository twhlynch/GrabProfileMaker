import * as THREE from "https://unpkg.com/three@0.145.0/build/three.module.js";
import { OBJLoader } from "https://cdn.skypack.dev/three@v0.132.0/examples/jsm/loaders/OBJLoader.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@v0.132.0/examples/jsm/controls/OrbitControls.js";
// config

var allObjects = [];
var primary = "#ffffff";
var secondary = "#ff0000";

// main canvas
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
const light = new THREE.AmbientLight(0xbbbbbb, 1);
const controls = new OrbitControls(camera, renderer.domElement);
scene.add(light);
document.getElementById("mainCanvas").appendChild(renderer.domElement);
renderer.domElement.id = "canvas";
camera.position.z = 10.3;
camera.position.y = 0.5;
camera.lookAt(0, 0, 0);

// load body, feet, head, and hand_claw
const loader = new OBJLoader();
let defaults = ["feet", "head", "body", "hand_claw"];
for (let i = 0; i < defaults.length; i++) {
    const name = defaults[i];
    loader.load(`./models/${name}.sgm.obj`, function (object) {
        var geometry = object.children[0].geometry;
        var material = new THREE.MeshPhongMaterial({ color: primary });
        var mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        if (object.children.length > 1) {
            var geometry = object.children[1].geometry;
            var material = new THREE.MeshPhongMaterial({ color: secondary });
            var mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);
        }
    });    
}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

render();

// cosmetics

function createCosmeticOption(name, canvas, primary, secondary, listAll) {
    var objects = [];
    const loader = new OBJLoader();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    const light = new THREE.AmbientLight(0xbbbbbb, 1);
    scene.add(light);
    renderer.setSize(50, 50);
    canvas.appendChild(renderer.domElement);
    renderer.domElement.title = name;
    camera.position.z = 1.3;
    camera.position.y = 0.5;
    camera.lookAt(0, 0, 0);

    loader.load(`./models/${name}.sgm.obj`, function (object) {
        var geometry = object.children[0].geometry;
        var material = new THREE.MeshPhongMaterial({ color: primary });
        var mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        objects.push(mesh);
        if (object.children.length > 1) {
            var geometry = object.children[1].geometry;
            var material = new THREE.MeshPhongMaterial({ color: secondary });
            var mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);
            objects.push(mesh);
        }

        // Notify that the object loading is complete
        onLoadComplete();
    });

    function onLoadComplete() {
        listAll.push(objects);

        var render = function () {
            requestAnimationFrame(render);
            objects.forEach(function (object) {
                object.rotation.y += 0.01;
            });
            renderer.render(scene, camera);
        };
        render();
    }
}

var cosmetics = {
    hats: ["bunnyears_basic", "cheese_basic", "crown_royal"],
    faces: ["hmd_meta_basic", "horns_devil_basic"],
    heads: ["head", "diver_oldschool"],
};

const hats_element = document.getElementById("hat");
const faces_element = document.getElementById("face");
const heads_element = document.getElementById("head");

for (let i = 0; i < cosmetics.hats.length; i++) {
    const hat = cosmetics.hats[i];
    createCosmeticOption(hat, hats_element, primary, secondary, allObjects);
}

for (let i = 0; i < cosmetics.faces.length; i++) {
    const face = cosmetics.faces[i];
    createCosmeticOption(face, faces_element, primary, secondary, allObjects);
}

for (let i = 0; i < cosmetics.heads.length; i++) {
    const head = cosmetics.heads[i];
    createCosmeticOption(head, heads_element, primary, secondary, allObjects);
}

// options

const primary_element = document.getElementById("primary");
const secondary_element = document.getElementById("secondary");

primary_element.addEventListener("change", function (e) {
    primary = e.target.value;
    // Update the colors directly when the input changes
    allObjects.forEach(function (objectArray) {
        if (objectArray.length > 0) {
            objectArray[0].material.color.set(primary);
        }
    });
});

secondary_element.addEventListener("change", function (e) {
    secondary = e.target.value;
    // Update the colors directly when the input changes
    allObjects.forEach(function (objectArray) {
        if (objectArray.length > 1) {
            objectArray[1].material.color.set(secondary);
        }
    });
});
