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
const directionalLight = new THREE.DirectionalLight(0xeeeeee, 0.7);
directionalLight.position.set(5, 10, 7);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
const controls = new OrbitControls(camera, renderer.domElement);
scene.add(light);
scene.add(directionalLight);
document.getElementById("mainCanvas").appendChild(renderer.domElement);
renderer.domElement.id = "canvas";
renderer.setSize(400, 400);
camera.position.set(-2, 0, -3);
camera.lookAt(0, 0, 0);

var actives = {
    body: "body",
    feet: "feet",
    head: "head",
    hand: "hand_claw",
    hat: false,
    face: false,
}; 

function loadCosmetic(name, scene, move=[0,0,0], rotate=[0,0,0], reverse=false) {
    const loader = new OBJLoader();
    loader.load(`./models/${name}.sgm.obj`, function (object) {
        for (let i = 0; i < object.children.length; i++) {
            const child = object.children[i];
            var colors = [primary, secondary];
            if (reverse) {
                colors = [secondary, primary];
            }
            var geometry = object
                .children[i]
                .geometry;
            if (i == 0) {
                var material = new THREE.MeshStandardMaterial({color: colors[1], roughness: 1, metalness: 0});
            } else if (i == 1) {
                var material = new THREE.MeshStandardMaterial({color: colors[0], roughness: 1, metalness: 0});
            } else {
                var material = new THREE.MeshStandardMaterial({color: "#ffffff", roughness: 1, metalness: 0});
            }
            var mesh = new THREE.Mesh(geometry, material);
            mesh.position.x += move[0];
            mesh.position.y += move[1];
            mesh.position.z += move[2];
            mesh.rotation.x += rotate[0];
            mesh.rotation.y += rotate[1];
            mesh.rotation.z += rotate[2];
            scene.add(mesh);

        }

    });
}

function loadCosmetics(scene) {
    scene.clear();
    scene.add(light);
    scene.add(directionalLight);
    if (actives.body) {
        loadCosmetic(actives.body, scene, [0, -0.2, 0]);
    }
    
    if (actives.feet) {
        loadCosmetic(actives.feet, scene, [0, -1.2, 0]);
    }
    
    if (actives.head) {
        loadCosmetic(actives.head, scene, [0, 0, 0], [0, 0, 0], true);
    }
    
    if (actives.hand) {
        loadCosmetic(actives.hand, scene, [0.3, -0.78, 0], [-45, 0, 0]);
        loadCosmetic(actives.hand, scene, [-0.3, -0.78, 0], [-45, 0, 0]);
    }
    
    if (actives.hat) {
        loadCosmetic(actives.hat, scene);
    }
    
    if (actives.face) {
        loadCosmetic(actives.face, scene);
    }
}
loadCosmetics(scene);
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

render();

function createCosmeticOption(name, canvas, primary, secondary, listAll) {
    canvas.innerHTML += `<img width=50 src="./models/${name}.sgm.png" title="${name}" />`;
}

var cosmetics = {
    hats: [
        "bunnyears_basic",
        "cheese_basic",
        "baseballcap_basic",
        "cowboyhat_basic",
        "fedora_easter_2023",
        "cowboyhat_basic_dev",
        "tophat_basic",
        "tophat_heart",
        "tree_christmas_2022",
        "umbrellahat_basic",
        "witchhat_basic",
        "crown_royal",
        "sunhat_basic",
        "ninjahat_basic",
        "headband_basic",
        "halo_angel_basic",
        "sunhat_basic_moderator",
    ],
    faces: [
        "hmd_meta_basic",
        "horns_devil_basic",
        "beard_christmas_2022",
        "mask_oni_basic",
        "mask_dragon_paper",
        "catears_piercing",
    ],
    heads: [
        "head",
        "space_basic",
        "diver_oldschool",
    ],
    hands: [
        "hand_claw",
        "sphere_basic",
    ]
};

const hats_element = document.getElementById("hat");
const faces_element = document.getElementById("face");
const heads_element = document.getElementById("head");
const hands_element = document.getElementById("hand");

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

for (let i = 0; i < cosmetics.hands.length; i++) {
    const hand = cosmetics.hands[i];
    createCosmeticOption(hand, hands_element, primary, secondary, allObjects);
}
// options

const primary_element = document.getElementById("primary");
const secondary_element = document.getElementById("secondary");

primary_element.addEventListener("change", function (e) {
    primary = e.target.value;
    loadCosmetics(scene);
});

secondary_element.addEventListener("change", function (e) {
    secondary = e.target.value;
    loadCosmetics(scene);
});


var hats_elements = document.querySelectorAll("#hat img");
var faces_elements = document.querySelectorAll("#face img");
var heads_elements = document.querySelectorAll("#head img");
var hands_elements = document.querySelectorAll("#hand img");

hats_elements.forEach(function (element) {
    element.addEventListener("click", function () {
        var name = element.title;
        actives.hat = name;
        loadCosmetics(scene);
    });
});

faces_elements.forEach(function (element) {
    element.addEventListener("click", function () {
        var name = element.title;
        actives.face = name;
        loadCosmetics(scene);
    });
});

heads_elements.forEach(function (element) {
    element.addEventListener("click", function () {
        var name = element.title;
        actives.head = name;
        loadCosmetics(scene);
    });
});

hands_elements.forEach(function (element) {
    element.addEventListener("click", function () {
        var name = element.title;
        actives.hand = name;
        loadCosmetics(scene);
    });
});


