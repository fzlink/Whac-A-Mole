"use strict";
var canvas;
function starter(obj) {
	obj.userData["initialTranslation"] = obj.transform.translation;
	obj.userData["initialScaling"] = obj.transform.scaling;
	obj.userData["initialRotation"] = obj.transform.rotation;
}
function updater(obj, period) {	
    if(obj.die){
		obj.dieTimer += 0.2;
          obj.transform.rotation = mult(rotateY(2), obj.transform.rotation);
          obj.transform.scaling = mult(
            scalem(0.95, 0.95, 0.95),
            obj.transform.scaling
          );
    }
    else if(obj.up_down == "down"){
      obj.transform.translation = mult(
        translate(0, -0.1, 0),
        obj.transform.translation
      );
    }
    else if(obj.up_down == "up"){
      obj.transform.translation = mult(
        translate(0, 0.1, 0),
        obj.transform.translation
      );
    }

    if(obj.die && obj.dieTimer >= 10){
      obj.transform.translation = obj.userData["initialTranslation"];
      obj.transform.scaling  =   obj.userData["initialScaling"];
      obj.transform.rotation = obj.userData["initialRotation"];
      obj.die = false;
      obj.up_down="down";
      obj.timer = 0;
	  obj.dieTimer = 0;
    }

    const t = obj.transform.translation;
    const x = t[0][3];
    const y = t[1][3];
    const z = t[2][3];
	
    obj.timer += 0.2;
    if(obj.timer >= period){
      if(obj.up_down == "down"){
        obj.up_down = "up";
      }
      else if(obj.up_down == "up"){
        obj.up_down = "down";
      }
      obj.timer = 0;
    }
}

function setupGameObjects(gl) {
  const gameObjects = {};

  //// The simulation ground
  gameObjects["ground"] = new Cube(
    gl,
    vec4(0.0, 1.0, 0.0, 1.0),
    new Transform({ scaling: scalem(50, 0.1, 30) })
  );


  //////////////////////////Our Game Objects///////////////////
  gameObjects["hole1"] = new Cube(
    gl,
    vec4(0.0, 0.0, 0.0, 1.0),
    new Transform({
      scaling: scalem(3, 0.2, 3),
    translation: translate(-6, 0, 0) })
  );

  gameObjects["hole2"] = new Cube(
    gl,
    vec4(0.0, 0.0, 0.0, 1.0),
    new Transform({
      scaling: scalem(3, 0.2, 3),
    translation: translate(0, 0, 0) })
  );

  gameObjects["hole3"] = new Cube(
    gl,
    vec4(0.0, 0.0, 0.0, 1.0),
    new Transform({
      scaling: scalem(3, 0.2, 3),
    translation: translate(6, 0, 0) })
  );

  gameObjects["mole1"] = new Cube(
    gl,
    vec4(0.72, 0.47, 0.33, 1.0),
    new Transform({
      scaling: scalem(1.75, 1.50, 1.75),
    translation: translate(-6, 0, 0) })
  );
  
  gameObjects["mole1_head"] = new Cube(
    gl,
    vec4(0.72, 0.47, 0.33, 1.0),
    new Transform({
      scaling: scalem(2.50, 1.50, 2.50),
    translation: translate(-6, 1.50, 0) })
  );
  
  gameObjects["mole1_nose"] = new Cube(
    gl,
    vec4(1, 0.68, 0.78, 1.0),
    new Transform({
      scaling: scalem(0.10, 0.50, 0.30),
    translation: translate(-6, 1.90, 1.25) })
  );
  
  gameObjects["mole1_r_eye"] = new Cube(
    gl,
    vec4(0.01, 0, 0, 1.0),
    new Transform({
      scaling: scalem(0.20, 0.20, 0.20),
    translation: translate(-5.30, 2.40, 1.25) })
  );
  
  gameObjects["mole1_l_eye"] = new Cube(
    gl,
    vec4(0.01, 0, 0, 1.0),
    new Transform({
      scaling: scalem(0.20, 0.20, 0.20),
    translation: translate(-6.70, 2.40, 1.25) })
  );
  
  gameObjects["mole1_l_raw"] = new Cube(
    gl,
    vec4(0.6, 0.45, 0.36, 1.0),
    new Transform({
      scaling: scalem(0.50, 0.50, 0.50),
    translation: translate(-6.50, 1, 1.25) })
  );
    
  gameObjects["mole1_l_nail1"] = new Cube(
    gl,
    vec4(1, 0.68, 0.78, 1.0),
    new Transform({
    scaling: scalem(0.10, 0.50, 0.10),
    translation: translate(-6.65, 0.50, 1.25) })
  );
  gameObjects["mole1_l_nail2"] = new Cube(
    gl,
    vec4(1, 0.68, 0.78, 1.0),
    new Transform({
    scaling: scalem(0.10, 0.50, 0.10),
    translation: translate(-6.40, 0.50, 1.25) })
  );
  
  gameObjects["mole1_l_nail3"] = new Cube(
    gl,
    vec4(1, 0.68, 0.78, 1.0),
    new Transform({
    scaling: scalem(0.10, 0.50, 0.10),
    translation: translate(-6.15, 0.50, 1.25) })
  );
  
  gameObjects["mole1_r_raw"] = new Cube(
    gl,
    vec4(0.6, 0.45, 0.36, 1.0),
    new Transform({
      scaling: scalem(0.50, 0.50, 0.50),
    translation: translate(-5.50, 1, 1.25) })
  );
  
  gameObjects["mole1_r_nail1"] = new Cube(
    gl,
    vec4(1, 0.68, 0.78, 1.0),
    new Transform({
    scaling: scalem(0.10, 0.50, 0.10),
    translation: translate(-5.65, 0.50, 1.25) })
  );
  gameObjects["mole1_r_nail2"] = new Cube(
    gl,
    vec4(1, 0.68, 0.78, 1.0),
    new Transform({
    scaling: scalem(0.10, 0.50, 0.10),
    translation: translate(-5.40, 0.50, 1.25) })
  );
  
  gameObjects["mole1_r_nail3"] = new Cube(
    gl,
    vec4(1, 0.68, 0.78, 1.0),
    new Transform({
    scaling: scalem(0.10, 0.50, 0.10),
    translation: translate(-5.15, 0.50, 1.25) })
  );

  gameObjects["mole2"] = new Cube(
    gl,
    vec4(0.70, 0.47, 0.33, 1.0),
    new Transform({
      scaling: scalem(1.75, 1.75, 1.75),
    translation: translate(0, 0, 0) })
  );
  gameObjects["mole2_head"] = new Cube(
    gl,
    vec4(0.70, 0.47, 0.33, 1.0),
    new Transform({
      scaling: scalem(2.50, 1.50, 2.50),
    translation: translate(0, 1.50, 0) })
  );
  
  gameObjects["mole2_nose"] = new Cube(
    gl,
    vec4(0.98, 0.68, 0.78, 1.0),
    new Transform({
      scaling: scalem(0.10, 0.50, 0.30),
    translation: translate(0, 1.90, 1.25) })
  );
  
    gameObjects["mole2_r_eye"] = new Cube(
    gl,
    vec4(0.02, 0, 0, 1.0),
    new Transform({
      scaling: scalem(0.20, 0.20, 0.20),
    translation: translate(0.70, 2.40, 1.25) })
  );
  
  gameObjects["mole2_l_eye"] = new Cube(
    gl,
    vec4(0.02, 0, 0, 1.0),
    new Transform({
      scaling: scalem(0.20, 0.20, 0.20),
    translation: translate(-0.70, 2.40, 1.25) })
  );
  
  gameObjects["mole2_l_raw"] = new Cube(
    gl,
    vec4(0.58, 0.45, 0.36, 1.0),
    new Transform({
      scaling: scalem(0.50, 0.50, 0.50),
    translation: translate(-0.50, 1, 1.25) })
  );
    
  gameObjects["mole2_l_nail1"] = new Cube(
    gl,
    vec4(0.98, 0.68, 0.78, 1.0),
    new Transform({
    scaling: scalem(0.10, 0.50, 0.10),
    translation: translate(-0.70, 0.50, 1.25) })
  );
  gameObjects["mole2_l_nail2"] = new Cube(
    gl,
    vec4(0.98, 0.68, 0.78, 1.0),
    new Transform({
    scaling: scalem(0.10, 0.50, 0.10),
    translation: translate(-0.50, 0.50, 1.25) })
  );
  
  gameObjects["mole2_l_nail3"] = new Cube(
    gl,
    vec4(0.98, 0.68, 0.78, 1.0),
    new Transform({
    scaling: scalem(0.10, 0.50, 0.10),
    translation: translate(-0.30, 0.50, 1.25) })
  );
  
  gameObjects["mole2_r_raw"] = new Cube(
    gl,
    vec4(0.58, 0.45, 0.36, 1.0),
    new Transform({
      scaling: scalem(0.50, 0.50, 0.50),
    translation: translate(0.40, 1, 1.25) })
  );
  
  gameObjects["mole2_r_nail1"] = new Cube(
    gl,
    vec4(0.98, 0.68, 0.78, 1.0),
    new Transform({
    scaling: scalem(0.10, 0.50, 0.10),
    translation: translate(0.20, 0.50, 1.25) })
  );
  gameObjects["mole2_r_nail2"] = new Cube(
    gl,
    vec4(0.98, 0.68, 0.78, 1.0),
    new Transform({
    scaling: scalem(0.10, 0.50, 0.10),
    translation: translate(0.40, 0.50, 1.25) })
  );
  
  gameObjects["mole2_r_nail3"] = new Cube(
    gl,
    vec4(0.98, 0.68, 0.78, 1.0),
    new Transform({
    scaling: scalem(0.10, 0.50, 0.10),
    translation: translate(0.60, 0.50, 1.25) })
  );
  

  gameObjects["mole3"] = new Cube(
    gl,
    vec4(0.68, 0.47, 0.33, 1.0),
    new Transform({
      scaling: scalem(1.75, 1.75, 1.75),
    translation: translate(6, 0, 0) })
  );
  
    gameObjects["mole3_head"] = new Cube(
    gl,
    vec4(0.68, 0.47, 0.33, 1.0),
    new Transform({
      scaling: scalem(2.50, 1.50, 2.50),
    translation: translate(6, 1.50, 0) })
  );
  
  gameObjects["mole3_nose"] = new Cube(
    gl,
    vec4(0.96, 0.68, 0.78, 1.0),
    new Transform({
      scaling: scalem(0.10, 0.50, 0.30),
    translation: translate(6, 1.90, 1.25) })
  );
  
    gameObjects["mole3_r_eye"] = new Cube(
    gl,
    vec4(0.04, 0, 0, 1.0),
    new Transform({
      scaling: scalem(0.20, 0.20, 0.20),
    translation: translate(6.70, 2.40, 1.25) })
  );
  
  gameObjects["mole3_l_eye"] = new Cube(
    gl,
    vec4(0.04, 0, 0, 1.0),
    new Transform({
      scaling: scalem(0.20, 0.20, 0.20),
    translation: translate(5.30, 2.40, 1.25) })
  );
  
  gameObjects["mole3_l_raw"] = new Cube(
    gl,
    vec4(0.56, 0.45, 0.36, 1.0),
    new Transform({
      scaling: scalem(0.50, 0.50, 0.50),
    translation: translate(5.50, 1, 1.25) })
  );
    
  gameObjects["mole3_l_nail1"] = new Cube(
    gl,
    vec4(0.96, 0.68, 0.78, 1.0),
    new Transform({
    scaling: scalem(0.10, 0.50, 0.10),
    translation: translate(5.30, 0.50, 1.25) })
  );
  gameObjects["mole3_l_nail2"] = new Cube(
    gl,
    vec4(0.96, 0.68, 0.78, 1.0),
    new Transform({
    scaling: scalem(0.10, 0.50, 0.10),
    translation: translate(5.50, 0.50, 1.25) })
  );
  
  gameObjects["mole3_l_nail3"] = new Cube(
    gl,
    vec4(0.96, 0.68, 0.78, 1.0),
    new Transform({
    scaling: scalem(0.10, 0.50, 0.10),
    translation: translate(5.70, 0.50, 1.25) })
  );
  
  gameObjects["mole3_r_raw"] = new Cube(
    gl,
    vec4(0.56, 0.45, 0.36, 1.0),
    new Transform({
      scaling: scalem(0.50, 0.50, 0.50),
    translation: translate(6.40, 1, 1.25) })
  );
  
  gameObjects["mole3_r_nail1"] = new Cube(
    gl,
    vec4(0.96, 0.68, 0.78, 1.0),
    new Transform({
    scaling: scalem(0.10, 0.50, 0.10),
    translation: translate(6.20, 0.50, 1.25) })
  );
  gameObjects["mole3_r_nail2"] = new Cube(
    gl,
    vec4(0.96, 0.68, 0.78, 1.0),
    new Transform({
    scaling: scalem(0.10, 0.50, 0.10),
    translation: translate(6.40, 0.50, 1.25) })
  );
  
  gameObjects["mole3_r_nail3"] = new Cube(
    gl,
    vec4(0.96, 0.68, 0.78, 1.0),
    new Transform({
    scaling: scalem(0.10, 0.50, 0.10),
    translation: translate(6.60, 0.50, 1.25) })
  );


  gameObjects["mole1"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole1"].updateFunction = function(obj) {
	updater(obj, 10);
  };
  gameObjects["mole1_head"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole1_head"].updateFunction = function(obj) {
	updater(obj, 10);
  };
  gameObjects["mole1_nose"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole1_nose"].updateFunction = function(obj) {
	updater(obj, 10);
  };
  gameObjects["mole1_r_eye"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole1_r_eye"].updateFunction = function(obj) {
	updater(obj, 10);
  };
  gameObjects["mole1_l_eye"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole1_l_eye"].updateFunction = function(obj) {
	updater(obj, 10);
  };
  gameObjects["mole1_l_raw"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole1_l_raw"].updateFunction = function(obj) {
	updater(obj, 10);
  };
  gameObjects["mole1_r_raw"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole1_r_raw"].updateFunction = function(obj) {
	updater(obj, 10);
  };
  gameObjects["mole1_l_nail1"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole1_l_nail1"].updateFunction = function(obj) {
	updater(obj, 10);
  };
  gameObjects["mole1_l_nail2"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole1_l_nail2"].updateFunction = function(obj) {
	updater(obj, 10);
  };
  gameObjects["mole1_l_nail3"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole1_l_nail3"].updateFunction = function(obj) {
	updater(obj, 10);
  };
  gameObjects["mole1_r_nail1"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole1_r_nail1"].updateFunction = function(obj) {
	updater(obj, 10);
  };
  gameObjects["mole1_r_nail2"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole1_r_nail2"].updateFunction = function(obj) {
	updater(obj, 10);
  };
  gameObjects["mole1_r_nail3"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole1_r_nail3"].updateFunction = function(obj) {
	updater(obj, 10);
  }; 
  gameObjects["mole2_head"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole2_head"].updateFunction = function(obj) {
	updater(obj, 15);
  };
  gameObjects["mole2_nose"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole2_nose"].updateFunction = function(obj) {
	updater(obj, 15);
  }; 
  gameObjects["mole2_r_eye"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole2_r_eye"].updateFunction = function(obj) {
	updater(obj, 15);
  };
  gameObjects["mole2_l_eye"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole2_l_eye"].updateFunction = function(obj) {
	updater(obj, 15);
  };
  gameObjects["mole2_l_raw"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole2_l_raw"].updateFunction = function(obj) {
	updater(obj, 15);
  };
  gameObjects["mole2_r_raw"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole2_r_raw"].updateFunction = function(obj) {
	updater(obj, 15);
  };
  gameObjects["mole2_l_nail1"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole2_l_nail1"].updateFunction = function(obj) {
	updater(obj, 15);
  };
  gameObjects["mole2_l_nail2"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole2_l_nail2"].updateFunction = function(obj) {
	updater(obj, 15);
  };
  gameObjects["mole2_l_nail3"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole2_l_nail3"].updateFunction = function(obj) {
	updater(obj, 15);
  };
  gameObjects["mole2_r_nail1"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole2_r_nail1"].updateFunction = function(obj) {
	updater(obj, 15);
  };
  gameObjects["mole2_r_nail2"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole2_r_nail2"].updateFunction = function(obj) {
	updater(obj, 15);
  };
  gameObjects["mole2_r_nail3"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole2_r_nail3"].updateFunction = function(obj) {
	updater(obj, 15);
  };
  gameObjects["mole2"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole2"].updateFunction = function(obj) {
	updater(obj, 15);
  }; 
  gameObjects["mole3"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole3"].updateFunction = function(obj) {
	updater(obj, 12);
  };
  gameObjects["mole3_head"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole3_head"].updateFunction = function(obj) {
	updater(obj, 12);
  };
  gameObjects["mole3_nose"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole3_nose"].updateFunction = function(obj) {
	updater(obj, 12);
  }; 
  gameObjects["mole3_r_eye"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole3_r_eye"].updateFunction = function(obj) {
	updater(obj, 12);
  };
  gameObjects["mole3_l_eye"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole3_l_eye"].updateFunction = function(obj) {
	updater(obj, 12);
  };
  gameObjects["mole3_l_raw"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole3_l_raw"].updateFunction = function(obj) {
	updater(obj, 12);
  };
  gameObjects["mole3_r_raw"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole3_r_raw"].updateFunction = function(obj) {
	updater(obj, 12);
  };
  gameObjects["mole3_l_nail1"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole3_l_nail1"].updateFunction = function(obj) {
	updater(obj, 12);
  };
  gameObjects["mole3_l_nail2"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole3_l_nail2"].updateFunction = function(obj) {
	updater(obj, 12);
  };
  gameObjects["mole3_l_nail3"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole3_l_nail3"].updateFunction = function(obj) {
	updater(obj, 12);
  };
  gameObjects["mole3_r_nail1"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole3_r_nail1"].updateFunction = function(obj) {
	updater(obj, 12);
  };
  gameObjects["mole3_r_nail2"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole3_r_nail2"].updateFunction = function(obj) {
	updater(obj, 12);
  };
  gameObjects["mole3_r_nail3"].startFunction = function(obj) {
	starter(obj);
  };
  gameObjects["mole3_r_nail3"].updateFunction = function(obj) {
	updater(obj, 12);
  };
 
  //// return all the objects
  return gameObjects;
}

//// camera parameters
var near;
var far;
var radius;
var theta;
var phi;
var fov;
var aspect;
var eye;
const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);

//// a class that represents the gameobject transform matrices
class Transform {
  constructor({
    scaling = mat4(),
    rotation = mat4(),
    translation = mat4()
  } = {}) {
    this.scaling = scaling;
    this.rotation = rotation;
    this.translation = translation;
  }
  modelMatrix() {
    return mult(this.translation, mult(this.rotation, this.scaling));
  }
}

//// base class for game objects
class GameObject {
  constructor(gl, transform) {
    //// the user can use object to store arbitrary values
    this.userData = {};

    //// WebGL rendering context
    this.gl = gl;

    //// the program objects obtained from shaders
    this.program = initShaders(gl, "vertex-shader", "fragment-shader");
    this.u_Clicked = this.gl.getUniformLocation(this.program, "u_Clicked");

    //// Model view projection matrices
    this.transform = transform;
    this.viewMatrix = mat4();
    this.projectionMatrix = mat4();
	this.timer =0;
	this.dieTimer = 0;
	this.up_down = "down";
	this.die = false;
    this.updateFunction = -1;
    this.startFunction = -1;
  }

  update() {
    if (this.updateFunction != -1) {
      this.updateFunction(this);
    }
  }
  start() {
    if (this.startFunction != -1) {
      this.startFunction(this);
    }
  }
}

//// Cube is a game object
class Cube extends GameObject {
  constructor(gl, color, transform) {
    super(gl, transform);

    //// Model buffers and attributes
    [this.pointsArray, this.colorsArray] = cubePointsAndColors(color);
    this.numVertices = 36;
    this.initAttributeBuffers();

    //// Uniform Locations
    this.modelViewProjectionMatrixLoc = gl.getUniformLocation(
      this.program,
      "modelViewProjectionMatrix"
    );

this.normalMatrix = this.gl.getUniformLocation(this.program,"normalMatrix");

  }


  initAttributeBuffers() {
    //// color attribute
    this.gl.useProgram(this.program);
    this.gl.uniform1i(this.u_Clicked, 0);

    this.cBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.cBuffer);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      flatten(this.colorsArray),
      this.gl.STATIC_DRAW
    );
    this.vColor = this.gl.getAttribLocation(this.program, "vColor");

    //// position attribute
    this.vBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vBuffer);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      flatten(this.pointsArray),
      this.gl.STATIC_DRAW
    );
    this.vPosition = this.gl.getAttribLocation(this.program, "vPosition");

////////////////////////////////////
 this.normalBuffer = this.gl.createBuffer();
 this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.normalBuffer);
this.vNormal = this.gl.getAttribLocation(this.program, "vNormal");
 this.vertexNormals = [
   // Front
    0.0,  0.0,  1.0,
    0.0,  0.0,  1.0,
    0.0,  0.0,  1.0,
    0.0,  0.0,  1.0,

   // Back
    0.0,  0.0, -1.0,
    0.0,  0.0, -1.0,
    0.0,  0.0, -1.0,
    0.0,  0.0, -1.0,

   // Top
    0.0,  1.0,  0.0,
    0.0,  1.0,  0.0,
    0.0,  1.0,  0.0,
    0.0,  1.0,  0.0,

   // Bottom
    0.0, -1.0,  0.0,
    0.0, -1.0,  0.0,
    0.0, -1.0,  0.0,
    0.0, -1.0,  0.0,

   // Right
    1.0,  0.0,  0.0,
    1.0,  0.0,  0.0,
    1.0,  0.0,  0.0,
    1.0,  0.0,  0.0,

   // Left
   -1.0,  0.0,  0.0,
   -1.0,  0.0,  0.0,
   -1.0,  0.0,  0.0,
   -1.0,  0.0,  0.0
 ];

 this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertexNormals),
               this.gl.STATIC_DRAW);
////////////////////////////////////



  }

  draw() {
    if(clicked){
      this.gl.useProgram(this.program);
      this.gl.uniform1i(this.u_Clicked, 1);
    }
    else{
      this.gl.useProgram(this.program);
      this.gl.uniform1i(this.u_Clicked, 0);
    }
    //// color attribute
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.cBuffer);
    this.gl.vertexAttribPointer(this.vColor, 4, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.vColor);

    //// position attribute
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vBuffer);
    this.gl.vertexAttribPointer(this.vPosition, 4, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.vPosition);

    //////////////////////
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.normalBuffer);
    this.gl.vertexAttribPointer(this.vNormal,3,this.gl.FLOAT,false, 0, 0);
    this.gl.enableVertexAttribArray(this.vNormal);
this.gl.useProgram(this.program);
    const normalMatrix = new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]);
    inverse4(normalMatrix);
    transpose(normalMatrix);


    this.gl.uniformMatrix4fv(
     this.normalMatrix,
     false,
     normalMatrix);
    /////////////////////
    //// modelViewProjectionMatrix uniform
    const modelViewProjectionMatrix = mult(
      this.projectionMatrix,
      mult(this.viewMatrix, this.transform.modelMatrix())
    );
    this.gl.useProgram(this.program);
    this.gl.uniformMatrix4fv(
      this.modelViewProjectionMatrixLoc,
      false,
      flatten(modelViewProjectionMatrix)
    );

    //// draw
    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.numVertices);

  }
} // class Cube


var clicked = false;
function check(
  gl,
  program,
  x,
  y,
  u_Clicked,
  gameObjects
) {
  var picked = false;
clicked = true;
  gl.useProgram(program);
  gl.uniform1i(u_Clicked, 1); // Pass true to u_Clicked
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gameObjects["mole1"].draw();
  gameObjects["mole1_head"].draw();
  gameObjects["mole2"].draw();
  gameObjects["mole2_head"].draw();
  gameObjects["mole3"].draw();
  gameObjects["mole3_head"].draw();

  //draw(gl, n, currentAngle, viewProjMatrix, u_MvpMatrix); // Draw cube with red

  // Read pixel at the clicked position
  // Array for storing the pixel value
  var pixels = new Uint8Array(4);
  gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

  // red color: (1 , 0 , 0)
  // or : (255, 0, 0)
  
  if (pixels[0] == 184 || pixels[0] == 153 || pixels[0] == 255 || pixels[0] == 2){
        picked = true;
		gameObjects["mole1"].die = true;
		gameObjects["mole1_head"].die = true;
		gameObjects["mole1_nose"].die = true;
		gameObjects["mole1_r_eye"].die = true;
		gameObjects["mole1_l_eye"].die = true;
		gameObjects["mole1_l_raw"].die = true;
		gameObjects["mole1_l_nail1"].die = true;
		gameObjects["mole1_l_nail2"].die = true;
		gameObjects["mole1_l_nail3"].die = true;
		gameObjects["mole1_r_raw"].die = true;
		gameObjects["mole1_r_nail1"].die = true;
		gameObjects["mole1_r_nail2"].die = true;
		gameObjects["mole1_r_nail3"].die = true;
  }
  else if (pixels[0] == 178 || pixels[0] == 148 || pixels[0] == 250 || pixels[0] == 7){
        picked = true;
		gameObjects["mole2"].die = true;
		gameObjects["mole2_head"].die = true;
		gameObjects["mole2_nose"].die = true;
		gameObjects["mole2_r_eye"].die = true;
		gameObjects["mole2_l_eye"].die = true;
		gameObjects["mole2_l_raw"].die = true;
		gameObjects["mole2_l_nail1"].die = true;
		gameObjects["mole2_l_nail2"].die = true;
		gameObjects["mole2_l_nail3"].die = true;
		gameObjects["mole2_r_raw"].die = true;
		gameObjects["mole2_r_nail1"].die = true;
		gameObjects["mole2_r_nail2"].die = true;
		gameObjects["mole2_r_nail3"].die = true;
  }
  else if (pixels[0] == 173 || pixels[0] == 143 || pixels[0] == 245 || pixels[0] == 12){
        picked = true;
		gameObjects["mole3"].die = true;
		gameObjects["mole3_head"].die = true;
		gameObjects["mole3_nose"].die = true;
		gameObjects["mole3_r_eye"].die = true;
		gameObjects["mole3_l_eye"].die = true;
		gameObjects["mole3_l_raw"].die = true;
		gameObjects["mole3_l_nail1"].die = true;
		gameObjects["mole3_l_nail2"].die = true;
		gameObjects["mole3_l_nail3"].die = true;
		gameObjects["mole3_r_raw"].die = true;
		gameObjects["mole3_r_nail1"].die = true;
		gameObjects["mole3_r_nail2"].die = true;
		gameObjects["mole3_r_nail3"].die = true;

  }

    // The mouse in on cube if R(pixels[0]) is 255
  gl.useProgram(program);
  gl.uniform1i(u_Clicked, 0); // Pass false to u_Clicked(rewrite the cube)
  clicked = false;
  gameObjects["mole1"].draw();
  gameObjects["mole2"].draw();
  gameObjects["mole3"].draw();
  
//  draw(gl, n, currentAngle, viewProjMatrix, u_MvpMatrix); // Draw the cube

  return picked;
}


var skor = 0;
window.onload = function init() {

  document.addEventListener('keydown', keyDownHandler, false);
  const canvas = document.getElementById("gl-canvas");
  const gl = setupWebGL();
  const program = initShaders(gl, "vertex-shader", "fragment-shader");
  const gameObjects = setupGameObjects(gl);
  canvas.onmousedown = function(ev) {
    // Mouse is pressed
    var x = ev.clientX; // browser coordinates
    var y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();

    if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
      // If pressed position is inside <canvas>, check if it is above object
      var x_in_canvas = x - rect.left;
      var y_in_canvas = rect.bottom - y;

      var u_Clicked = gl.getUniformLocation(program, "u_Clicked");
      gl.useProgram(program);
      gl.uniform1i(u_Clicked, 0);
      var picked = check(
        gl,
        program,
        x_in_canvas,
        y_in_canvas,
        u_Clicked,
        gameObjects
      );

      if (picked){
        skor += 10;
        document.getElementById("skortxt").innerHTML = "Skor:" + skor;
        if(skor==100){
          isPlay = false;
          //document.getElementById("skortxt").innerHTML = "KAZANDIN!";
          document.getElementById("overlay").removeAttribute("hidden");
          gl.getExtension('WEBGL_lose_context').loseContext();

        }
      }
    }
  };



  setupGUI();

  //// run the start() of all game objects and then do the first rendering
  for (const [name, gameObject] of Object.entries(gameObjects)) {
    gameObject.start();
  }
  render(gl, gameObjects);
};


var isPlay = true;
function keyDownHandler(event) {
    if(event.keyCode == 32) {
        isPlay = !isPlay;
		document.getElementById("pause").hidden = !document.getElementById("pause").hidden;
		//document.getElementById("pause").addAttribute("hidden");
        console.log(isPlay);
    }
}

function render(gl, gameObjects) {
  if(isPlay){
    //// clear the background
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //// camera settings
    eye = vec3(
      radius * Math.sin(theta) * Math.cos(phi),
      radius * Math.sin(theta) * Math.sin(phi),
      radius * Math.cos(theta)
    );
    const viewMatrix = lookAt(eye, at, up);
    const projectionMatrix = perspective(fov, aspect, near, far);

    //// draw all objects
    for (const [name, gameObject] of Object.entries(gameObjects)) {
      gameObject.update();
      gameObject.viewMatrix = viewMatrix;
      gameObject.projectionMatrix = projectionMatrix;
      gl.useProgram(gameObject.program);
      gameObject.draw();
    }

    //// call self for recursion

  }
    requestAnimFrame(() => render(gl, gameObjects));
}

function setupWebGL() {
  const canvas = document.getElementById("gl-canvas");
  var gl = canvas.getContext("webgl", {preserveDrawingBuffer: true});
  //const gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL isn't available");
  }
  gl.viewport(0, 0, canvas.width, canvas.height);

  aspect = canvas.width / canvas.height;
  gl.clearColor(0.2, 0.6, 1.0, 1.0);
  gl.enable(gl.DEPTH_TEST);
  return gl;
}

////
function setupGUI() {
  far = document.getElementById("zFarSlider").value;
  document.getElementById("zFarSlider").oninput = function(event) {
    far = event.target.value;
    document.getElementById("zFarValue").innerHTML = far;
  };

  near = document.getElementById("zNearSlider").value;
  document.getElementById("zNearSlider").oninput = function(event) {
    near = event.target.value;
    document.getElementById("zNearValue").innerHTML = near;
  };

  radius = document.getElementById("radiusSlider").value;
  document.getElementById("radiusSlider").oninput = function(event) {
    radius = event.target.value;
    document.getElementById("radiusValue").innerHTML = radius;
  };

  theta = document.getElementById("thetaSlider").value;
  document.getElementById("thetaSlider").oninput = function(event) {
    theta = (event.target.value * Math.PI) / 180.0;
    document.getElementById("thetaValue").innerHTML = event.target.value;
  };

  phi = document.getElementById("phiSlider").value;
  document.getElementById("phiSlider").oninput = function(event) {
    phi = (event.target.value * Math.PI) / 180.0;
    document.getElementById("phiValue").innerHTML = event.target.value;
  };

  document.getElementById("aspectSlider").value = aspect;
  document.getElementById("aspectValue").innerHTML = aspect;
  document.getElementById("aspectSlider").oninput = function(event) {
    aspect = event.target.value;
    document.getElementById("aspectValue").innerHTML = aspect;
  };

  fov = document.getElementById("fovSlider").value;
  document.getElementById("fovSlider").oninput = function(event) {
    fov = event.target.value;
    document.getElementById("fovValue").innerHTML = fov;
  };
}

////
function cubePointsAndColors(color) {
  var pointsArray = [];
  var colorsArray = [];
  var vertices = [
    vec4(-0.5, 0, 0.5, 1.0),
    vec4(-0.5, 1, 0.5, 1.0),
    vec4(0.5, 1, 0.5, 1.0),
    vec4(0.5, 0, 0.5, 1.0),
    vec4(-0.5, 0, -0.5, 1.0),
    vec4(-0.5, 1, -0.5, 1.0),
    vec4(0.5, 1, -0.5, 1.0),
    vec4(0.5, 0, -0.5, 1.0)
  ];
  var vertexColors = [color, color, color, color, color, color, color, color];
  function quad(a, b, c, d) {
    pointsArray.push(vertices[a]);
    colorsArray.push(vertexColors[a]);
    pointsArray.push(vertices[b]);
    colorsArray.push(vertexColors[a]);
    pointsArray.push(vertices[c]);
    colorsArray.push(vertexColors[a]);
    pointsArray.push(vertices[a]);
    colorsArray.push(vertexColors[a]);
    pointsArray.push(vertices[c]);
    colorsArray.push(vertexColors[a]);
    pointsArray.push(vertices[d]);
    colorsArray.push(vertexColors[a]);
  }

  quad(1, 0, 3, 2);
  quad(2, 3, 7, 6);
  quad(3, 0, 4, 7);
  quad(6, 5, 1, 2);
  quad(4, 5, 6, 7);
  quad(5, 4, 0, 1);
  return [pointsArray, colorsArray];
}
