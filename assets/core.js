var camera, clock, importData, init, origin, render, renderer, scene, setup, stats, trackball;

scene = camera = renderer = void 0;

clock = new THREE.Clock();

origin = {
  x: 0,
  y: 0,
  z: 0
};

setup = function() {
  var height, width;
  width = $(window).width();
  height = $(window).height() - $('header').height() - 8;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, width*0.6 / height, 0.1, 10000);
  	camera.position.x = 45.72;
	camera.position.y = 1.16;
	camera.position.z = -2.69;
	camera.rotation.x = -0.6622;
	camera.rotation.y = 1.0464;
	camera.rotation.z = 0.6123;
  renderer = new THREE.WebGLRenderer();
//  renderer.setPixelRatio( window.devicePixelRatio );

  window.addEventListener( 'resize', onWindowResize, false );
  renderer.setClearColor(0xFFFFFF);  //background color
  renderer.setSize(width/1.5, height);
  $('header').after(renderer.domElement);
  renderer.render(scene, camera);
  stats.init();
  return trackball.init();
};

init = function() {
	var container;

	container = document.createElement( 'div' );
	document.body.appendChild( container );
	container.appendChild( renderer.domElement );
	//light-------------------------------------------------------------------------------------------------------------------------
	var ambient = new THREE.AmbientLight( 0x404040 );
	scene.add( ambient );
	var directionalLight = new THREE.DirectionalLight( 0xFFFFFF );
	directionalLight.position.set( 1, 1, 1 );
	scene.add( directionalLight );
	var directionalLight2 = new THREE.DirectionalLight( 0xFFFFFF );
	directionalLight2.position.set( -1, -1, -1 );
	scene.add( directionalLight2 );
 //   alert('hello');
	//object-------------------------------------------------------------------------------------------------------------------------
    var manager = new THREE.LoadingManager();
	var loader = new THREE.OBJLoader( manager );
	var mtlloader = new THREE.MTLLoader ( manager );
	loader.load( 'obj/ship.obj', function ( object ) {
	mtlloader.load ('obj/ship.mtl', function(material){
	loader.setMaterials( material )});
	scene.add( object );
	});

  return render();
};

render = function() {
  renderer.render(scene, camera);
  if (stats.state) {
    stats.update();
  }
  trackball.update();
  return requestAnimationFrame(render);
};

stats = {
  state: false,
  init: function() {
    this.stats = new Stats();
    this.stats.setMode(0);
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.right = '0px';
    this.stats.domElement.style.bottom = '0px';
    return $("#stats").append(this.stats.domElement);
  },
  start: function() {
    this.state = true;
    return $("#stats").show();
  },
  stop: function() {
    this.state = false;
    return $("#stats").hide();
  },
  update: function() {
    return this.stats.update();
  }
};

trackball = {
  init: function() {
    return this.control = new THREE.TrackballControls(camera, renderer.domElement);
  },
  update: function() {
    var delta;
    delta = clock.getDelta();
    return this.control.update(delta);
  }
};

function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.aspect = (window.innerWidth/1.5) / (window.innerHeight-$('header').height() - 8);
	camera.updateProjectionMatrix();
 	renderer.setSize( window.innerWidth/1.5, window.innerHeight-$('header').height() - 8 );
}


$(document).on("ready", function() {
  setup();
  init();
  //$('#data-importer').on('change', importData);
  
  $('#cabin1-view').on('click', function() {
	  $("#table1").show();
 //   alert(scene.position);
 //    alert('camera.position.x='+camera.position.x+';camera.position.y='+camera.position.y+';camera.position.z='+camera.position.z+';');
	 //alert('position.x='+camera.position.x+';position.y='+camera.position.y+';position.z='+camera.position.z+';'+'rotation.x='+camera.rotation.x+';rotation.y='+camera.rotation.y+';rotation.z='+camera.rotation.z+';');
     //alert(camera.lookAt);
  });
   $('#cabin2-view').on('click', function() {
	  $("#table1").hide();
 //   alert(scene.position);
 //    alert('camera.position.x='+camera.position.x+';camera.position.y='+camera.position.y+';camera.position.z='+camera.position.z+';');
	 //alert('position.x='+camera.position.x+';position.y='+camera.position.y+';position.z='+camera.position.z+';'+'rotation.x='+camera.rotation.x+';rotation.y='+camera.rotation.y+';rotation.z='+camera.rotation.z+';');
     //alert(camera.lookAt);
  });
  $('#fullscreen').on('click', function () {
    
	if ($.AMUI.fullscreen.isFullscreen) {
		 $('#fullscreen').text('开启全屏显示');
	}
	else{
		 $('#fullscreen').text('关闭全屏显示');
	}
    $.AMUI.fullscreen.toggle();
  });

    $('#fireplan1').on('click', function() {
	  $('#offcanvas_fireplan1').offCanvas('open')
    });

    $myOc.on('open.offcanvas.amui', function() {
      console.log(id + ' 打开了。');
    }).on('close.offcanvas.amui', function() {
      console.log(id + ' 关闭了。');
    });

  return $('#stats-trigger').on('click', function() {
    if (stats.state) {
      stats.stop();
      return $('#stats-trigger').text('开启统计');
    } else {
      stats.start();
      return $('#stats-trigger').text('关闭统计');
    }
  });
  
});
