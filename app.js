const App = {
	pin1 : document.querySelector('.pin-1'),
	pin2 : document.querySelector('.pin-2'),
	pin3 : document.querySelector('.pin-3'),

	inputDskCount : document.querySelector('.disk-count'),
	inputBldSpeed : document.querySelector('.build-speed'),

	lblDskCount : document.querySelector('#lblDskCount'),
	lblBldSpeed : document.querySelector('#lblBldSpeed'),

	restartBtn : document.querySelector('#restart'),

	diskCount : 3,

	timerDiff : 100,
	speed : 1000,

	disks : [],

	timerID : [],

	placeDisk : function () {
		for (let i = 0; i < this.diskCount; i++) {
			let disk = document.createElement('li');
			disk.innerHTML = "disk-" + i;
			this.disks.push(disk);
			this.pin1.appendChild(disk);
		}
	},

	restart: function () {
		this.timerID.forEach(function (id) {
			clearTimeout(id);
		});

		this.timerDiff = 100;
		this.pin1.innerHTML = "";
		this.pin2.innerHTML = "";
		this.pin3.innerHTML = "";

		this.disks = [];

		this.placeDisk();

		this.pin1.style.height = 20 * this.disks.length + 'px';
		this.pin2.style.height = 20 * this.disks.length + 'px';
		this.pin3.style.height = 20 * this.disks.length + 'px';

		this.moveDisk(this.diskCount-1, this.pin1, this.pin2, this.pin3);
	},

	init : function () {
		this.bindAllEvents();
		this.placeDisk();
		this.moveDisk(this.diskCount-1, this.pin1, this.pin2, this.pin3);
		this.pin1.style.height = 20 * this.disks.length + 'px';
		this.pin2.style.height = 20 * this.disks.length + 'px';
		this.pin3.style.height = 20 * this.disks.length + 'px';
	},

	moveDisk : function (diskId, src, aux, dst) {
		if (diskId < 0) return false;

		this.moveDisk(diskId - 1, src, dst, aux);
		let that = this;

		this.timerID.push( setTimeout( function () {
			dst.prepend(that.disks[diskId]);
		}, that.timerDiff+=that.speed) );

		this.moveDisk(diskId - 1, aux, src, dst);
	},

    bindAllEvents : function () {

    	let that = this;
    	this.inputDskCount.oninput = function () {
    		that.lblDskCount.innerText = this.value;
    		that.diskCount = +this.value;
    	};

    	this.inputBldSpeed.oninput = function () {
    		that.lblBldSpeed.innerText = this.value;
    		that.speed = +this.value;
    	}

    	this.restartBtn.onclick = function () {
    		that.restart();
    	}
    }
};

App.init();