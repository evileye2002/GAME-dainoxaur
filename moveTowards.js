export function moveTowards(person, destinationPos, speed) {
  let distanceToTravelX = destinationPos.x - person.position.x;
  let distanceToTravelY = destinationPos.y - person.position.y;

  let distance = Math.sqrt(distanceToTravelX ** 2 + distanceToTravelY ** 2);

  if (distance <= speed) {
    person.position.x = destinationPos.x;
    person.position.y = destinationPos.y;
  } else {
    let nomalizedX = distanceToTravelX / distance;
    let nomalizedY = distanceToTravelY / distance;

    person.position.x += nomalizedX * speed;
    person.position.y += nomalizedY * speed;

    distanceToTravelX = destinationPos.x - person.position.x;
    distanceToTravelY = destinationPos.y - person.position.y;

    distance = Math.sqrt(distanceToTravelX ** 2 + distanceToTravelY ** 2);
  }

  return distance;
}
