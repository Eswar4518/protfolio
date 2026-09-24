import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
) => {
  // 🔧 STYLE CONFIG (edit here, not everywhere else)
  const characterStyle = {
    shirtColor: "#E6B7B2", // light pink sweatshirt
    pantColor: "#000000",
    skinColor: "#8D5524",
    beardColor: "#1C1C1C",
    glassesColor: "#000000",
    capColor: "#2C3E50", // dark cap color
    ponytailColor: "#1A1A1A", // dark hair color for ponytail
    showCap: true,
    showPonytail: true,
  };

  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();

  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const applyMaterialColor = (mesh: THREE.Mesh, color: string) => {
    if (!mesh.material) return;

    const newMat = (
      mesh.material as THREE.Material
    ).clone() as THREE.MeshStandardMaterial;
    newMat.color = new THREE.Color(color);
    mesh.material = newMat;
  };

  const applyGlassesMaterial = (mesh: THREE.Mesh) => {
    const newMat = new THREE.MeshStandardMaterial({
      color: characterStyle.glassesColor,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.95,
      envMapIntensity: 1.2,
    });
    mesh.material = newMat;
    mesh.visible = true;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  };

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        // 🔐 Decrypt model
        const encryptedBlob = await decryptFile(
          "/models/character.enc?v=2",
          "MyCharacter12",
        );

        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        loader.load(
          blobUrl,

          async (gltf) => {
            const character = gltf.scene;

            // 🚀 Precompile shaders (good practice)
            await renderer.compileAsync(character, camera, scene);

            character.traverse((child: any) => {
              if (!child.isMesh) return;

              const mesh = child as THREE.Mesh;

              // 🎨 Apply styles based on mesh names
              switch (mesh.name) {
                case "BODY.SHIRT":
                  applyMaterialColor(mesh, characterStyle.shirtColor);
                  break;

                case "Pant":
                  applyMaterialColor(mesh, characterStyle.pantColor);
                  break;

                case "Head":
                case "Body":
                case "Skin":
                  applyMaterialColor(mesh, characterStyle.skinColor);
                  break;

                default:
                  // Beard detection
                  if (mesh.name.toLowerCase().includes("beard")) {
                    applyMaterialColor(mesh, characterStyle.beardColor);
                  }

                  // Glasses detection - apply special material and ensure visibility
                  if (mesh.name.toLowerCase().includes("glass")) {
                    applyGlassesMaterial(mesh);
                  }

                  // Cap detection - apply styling and visibility
                  if (mesh.name.toLowerCase().includes("cap")) {
                    mesh.visible = characterStyle.showCap;
                    applyMaterialColor(mesh, characterStyle.capColor);
                  }

                  // Ponytail detection - apply styling and visibility
                  if (mesh.name.toLowerCase().includes("ponytail")) {
                    mesh.visible = characterStyle.showPonytail;
                    applyMaterialColor(mesh, characterStyle.ponytailColor);
                  }
              }

              // 🌑 Shadows & performance
              mesh.castShadow = true;
              mesh.receiveShadow = true;
              mesh.frustumCulled = true;
            });

            // 🦶 Fix foot alignment (still a hack, but controlled)
            const footR = character.getObjectByName("footR");
            const footL = character.getObjectByName("footL");

            if (footR) footR.position.y = 3.36;
            if (footL) footL.position.y = 3.36;

            // 🎬 Animations
            setCharTimeline(character, camera);
            setAllTimeline();

            resolve(gltf);

            // 🧹 Cleanup
            dracoLoader.dispose();
          },

          undefined,

          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          },
        );
      } catch (err) {
        console.error("Decryption or loading failed:", err);
        reject(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
