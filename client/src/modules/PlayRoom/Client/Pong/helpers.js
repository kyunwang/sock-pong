// Based on: https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_collision_detection

// TODO: Inverted conditional

export const collisionBoxSphere = (box, sphere, inverted = false) => {};

export const collisionBoxBox = (boxA, boxB, inverted = false) => {};

export const collisionSphereSphere = (sphereA, sphereB, inverted = false) => {
  const distance = Math.sqrt(
    (sphereA.position.x - sphereB.position.x) *
      (sphereA.position.x - sphereB.position.x) +
      (sphereA.position.y - sphereB.position.y) *
        (sphereA.position.y - sphereB.position.y) +
      (sphereA.position.z - sphereB.position.z) *
        (sphereA.position.z - sphereB.position.z)
  );

  if (inverted) {
    return (
      distance >
      Math.abs(
        sphereA.geometry.parameters.radius - sphereB.geometry.parameters.radius
      )
    );
  }

  return (
    distance <
    sphereA.geometry.parameters.radius + sphereB.geometry.parameters.radius
  );
};

export const collisionCylinderSphere = (cylinder, sphere) => {
  const distance = Math.sqrt(
    (cylinder.position.x - sphere.position.x) *
      (cylinder.position.x - sphere.position.x) +
      (cylinder.position.y - sphere.position.y) *
        (cylinder.position.y - sphere.position.y) +
      (cylinder.position.z - sphere.position.z) *
        (cylinder.position.z - sphere.position.z)
  );

  const cylinderHeight = cylinder.geometry.parameters.height / 2;
  const sphereRadius = sphere.geometry.parameters.radius;

  return (
    distance < sphereRadius + cylinderHeight ||
    distance < sphereRadius + cylinder.geometry.parameters.radiusTop
  );
};
