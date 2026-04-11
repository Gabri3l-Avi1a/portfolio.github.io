// Adding backwards movement animation, uncrossable boundary system, and boundary constraint framework

class Movement {
    constructor() {
        this.position = { x: 0, y: 0 };
        this.boundaries = {
            left: 0,
            right: 100,
            top: 0,
            bottom: 100
        };
    }
    // Rectangle example (keep character in area)
    new Boundary('safeZone', 'rectangle', {
      left: 100,
      right: 800,
      top: 200,
      bottom: 600
    });
    
    // Circle example (keep character away from center)
    new Boundary('dangerZone', 'circle', {
      centerX: 400,
      centerY: 300,
      radius: 150
    });
    
    // Polygon example (irregular shape)
    new Boundary('maze', 'polygon', {
      points: [
        {x: 0, y: 0},
        {x: 100, y: 0},
        {x: 100, y: 100},
        {x: 0, y: 100}
      ]
    });
    moveForward(distance) {
        this.position.x += distance;
        this.checkBoundaries();
    }

    moveBackward(distance) {
        this.position.x -= distance;
        this.checkBoundaries();
    }

    checkBoundaries() {
        if (this.position.x < this.boundaries.left) {
            this.position.x = this.boundaries.left;
        } else if (this.position.x > this.boundaries.right) {
            this.position.x = this.boundaries.right;
        }
        // Check other boundaries if required for y-axis
    }

    getPosition() {
        return this.position;
    }
}

// Example of using the Movement class
const movement = new Movement();
movement.moveForward(10);
movement.moveBackward(5);
console.log(movement.getPosition());
