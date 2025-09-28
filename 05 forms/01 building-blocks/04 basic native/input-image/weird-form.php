<!doctype html>

<html>
  <head>
    <style>
      * {
        box-sizing: border-box;
      }
      form {
        width: 500px;
        height: 600px;
        background: whitesmoke;
      }
      form label {
        display: block;
        padding: 20px;
        text-align: center;
      }
      form input {
        display: block;
        margin: 0 auto;
        border-radius: 10px;
        box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
      }
    </style>
  </head>
  <!-- 000 140 200 300 for cat       -->
  <!-- 160 000 300 105 for geom      -->
  <!-- 020 025 090 100 for direction -->
  <!-- 200 110 300 300 for octopus   -->
  <? 
    class Point {
      public function __construct(
        public float $x = 0, 
        public float $y = 0) 
      {
      }
    }

    class BoundingBox {
      public function __construct(
        public float $minX = 0, 
        public float $maxX = 0,
        public float $minY = 0,
        public float $maxY = 0
      ) 
      {
      }

      public function matches(Point $point): bool {
        $in_x = ($this->minX <= $point->x && $point->x <= $this->maxX);
        $in_y = ($this->minY <= $point->y && $point->y <= $this->maxY);
        return $in_x && $in_y;
      }
    }
    
    $octopus         = new BoundingBox(200, 300, 110, 300);
    $cat             = new BoundingBox(  0, 200, 140, 300);
    $direction_sign  = new BoundingBox( 20,  90,  25, 100);
    $geometry_blocks = new BoundingBox(160, 300,   0, 105);

    $point = new Point(0, 0);
    var_dump($_GET);
    $point->x = (float) ($_GET["things_x"] ?? 0);
    $point->y = (float) ($_GET["things_y"] ?? 0);

    $image_path = "color-unchecked.png";

    if ($octopus->matches($point)) {
      $image_path = "color-octopus.png";
    } else if ($cat->matches($point)) {
      $image_path = "color-cat.png";
    } else if ($direction_sign->matches($point)) {
      $image_path = "color-direction.png";
    } else if ($geometry_blocks->matches($point)) {
      $image_path = "color-geom.png";
    }
  ?>
  <body>
    <form>
      <label> Click on any object to toggle </label>
      <input 
        type="image" 
        alt="click me" 
        name="things"
        src="<?=$image_path?>" 
        width="300" 
        height="300"      
      />
    </form>
  </body>
</html>
