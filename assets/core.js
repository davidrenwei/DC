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

  // camera = new THREE.OrthographicCamera(45, width*0.6 / height, 0.1, 10000);
	camera = new THREE.PerspectiveCamera(45, width*0.6 / height, 0.1, 10000);
  	camera.position.x = 45;
	camera.position.y = 0;
	camera.position.z = 0;
	camera.rotation.x = 0;
	camera.rotation.y = 0;
	camera.rotation.z = Math.PI/2;
	camera.up.x=0;camera.up.y=1;camera.up.z=0;
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
function seecabin1() {

	camera.position.x=2.459355531449672;camera.position.y=17.261093496488964;camera.position.z=42.366334768013495;
	camera.rotation.x=-0.38689060419172916;camera.rotation.y=0.05370741310555913;camera.rotation.z=0.030055565563390375;
	camera.up.x=-0.02863887755248095;camera.up.y=0.9355198981075951;camera.up.z=-0.3521112536362405;
}
function seecabin2() {

	camera.position.x=37.370682429725264;camera.position.y=-16.782720684356157;camera.position.z=-158.64407122262776;
	camera.rotation.x=3.1103380249384;camera.rotation.y=0.4271391358106176;camera.rotation.z=3.140000377414054;
	camera.up.x=-0.3298958639762499;camera.up.y=0.6299254766064184;camera.up.z=0.7031092467415848;
}
function seecabin3() {

	camera.position.x=19.352728202989812;camera.position.y=-36.337172921498265;camera.position.z=126.99326489632504;
	camera.rotation.x=0.08882191882899693;camera.rotation.y=0.1812703656033156;camera.rotation.z=-0.25305263638012765;
	camera.up.x=0.03475137413908894;camera.up.y=0.7213249568509661;camera.up.z=-0.6917244022147767;
}



$(document).on("ready", function() {
  setup();
  init();
  
  $('#alerttrigger').on('click', function() {
    //console.log('camera.position.x='+camera.position.x+';camera.position.y='+camera.position.y+';camera.position.z='+camera.position.z+';');
	//console.log('camera.rotation.x='+camera.rotation.x+';camera.rotation.y='+camera.rotation.y+';camera.rotation.z='+camera.rotation.z+';'+'camera.rotation.order='+camera.rotation.order+';');
	//console.log('camera.up.x='+camera.up.x+';'+'camera.up.y='+camera.up.y+';'+'camera.up.z='+camera.up.z+';');
    //console.log('camera.fov='+camera.fov+';'+'camera.aspect='+camera.aspect+';'+'camera.near='+camera.near+';'+'camera.far='+camera.far+';');
    //console.log(camera.toJSON());
	var para = document.getElementById("alert-view").className = "am-icon-btn am-warning am-icon-warning ";
  	
  });

  
  $('#alermcabin1').on('click', function() {
	seecabin1();
	});
	$('#cabin1').on('click', function() {
	seecabin1();
	});
	$('#cabin1-view').on('click', function() {
	seecabin1();
	});
	  
  $('#alermcabin2').on('click', function() {
	seecabin2();
	});
  	$('#cabin2').on('click', function() {
	seecabin2();
	});
    $('#cabin2-view').on('click', function() {
	seecabin2();
    });
	$('#cabin3').on('click', function() {
	seecabin3();
	});
	$('#cabin3-view').on('click', function() {
	seecabin3();
	});
  
  $('#alert-view').on('click', function() {
	 $('#alertlist').offCanvas('open')
	 var para = document.getElementById("alert-view").className = "am-icon-btn am-icon-warning ";
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
    $('#cameraset').on('click', function () {
    
	if ($.AMUI.fullscreen.isFullscreen) {
		 $('#cameraset').text('2D视图显示');
	}
	else{
		 $('#cameraset').text('3D视图显示');
	}
  });

    $('#fireplan1').on('click', function() {
	  $('#offcanvas_fireplan1').offCanvas('open')
    });
	$('#fireplan2').on('click', function() {
	  $('#offcanvas_fireplan1').offCanvas('open')
    });
	$('#fireplan3').on('click', function() {
	  $('#offcanvas_fireplan1').offCanvas('open')
    });
	 $('#waterplan1').on('click', function() {
	  $('#offcanvas_fireplan1').offCanvas('open')
    });
	$('#waterplan2').on('click', function() {
	  $('#offcanvas_fireplan1').offCanvas('open')
    });
	$('#waterplan3').on('click', function() {
	  $('#offcanvas_fireplan1').offCanvas('open')
    });
	$('#electrition21').on('click', function() {
	  $('#electritionview').offCanvas('open')
    });
	$('#electrition11').on('click', function() {
	  $('#electritionview').offCanvas('open')
    });
	$('#water11').on('click', function() {
	  $('#waterview1').offCanvas('open')
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
