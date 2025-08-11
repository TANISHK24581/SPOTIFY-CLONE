console.log("hiuah");
async function getsongs() {
    let array = [];
    let array2 = [];

    // Fetch the songs.json file from the /SONGS folder
    let a = await fetch("/SONGS/songs.json");
    let data = await a.json();

    // Push the song's full URL into array
    for (let i = 0; i < data.length; i++) {
        array.push("/SONGS/" + encodeURIComponent(data[i]));
    }

    // Push only the song name (decoded) into array2
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        array2.push(element.split("/SONGS/")[1].replaceAll("%20", " "));
    }

    return array2;
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const paddedMins = mins.toString().padStart(2, '0');
    const paddedSecs = secs.toString().padStart(2, '0');
    return `${paddedMins}:${paddedSecs}`;
}

let currents = new Audio();
async function playmusic(i, p = false) {
    if (p == true) {
        i = "/SONGS/" + i;
        currents.src = i;
        currents.pause();
        let q = document.getElementsByClassName("musicdurationinfo")[0];
        q.innerHTML = "00:00/00:00";

        currents.addEventListener("timeupdate", () => {
            let q = document.getElementsByClassName("musicdurationinfo")[0];
            q.innerHTML = `${formatTime(currents.currentTime)}/${formatTime(currents.duration)}`;
            let e = document.getElementsByClassName("linecircle")[0];
            e.style.left = ((currents.currentTime) / (currents.duration)) * 100 + "%";
        });

        let g = document.getElementsByClassName("line")[0];
        g.addEventListener("click", (ee) => {
            let y = (ee.offsetX / ee.target.getBoundingClientRect().width) * 100;
            let eee = document.getElementsByClassName("linecircle")[0];
            eee.style.left = y + "%";
            currents.currentTime = (currents.duration) * y / 100;
        });

        let n = document.getElementsByClassName("playy")[0];
        n.src = "SVG/play2.svg";
        let u = document.getElementsByClassName("musicnameinfo")[0];
        u.innerHTML = i.replace("/SONGS/", "");
    }
    else {
        i = "/SONGS/" + i;
        currents.src = i;
        currents.play();
        let n = document.getElementsByClassName("playy")[0];
        n.src = "SVG/pause.svg";
        let u = document.getElementsByClassName("musicnameinfo")[0];
        u.innerHTML = i.replace("/SONGS/", "");

        currents.addEventListener("timeupdate", () => {
            let q = document.getElementsByClassName("musicdurationinfo")[0];
            q.innerHTML = `${formatTime(currents.currentTime)}/${formatTime(currents.duration)}`;
            let e = document.getElementsByClassName("linecircle")[0];
            e.style.left = ((currents.currentTime) / (currents.duration)) * 100 + "%";
        });

        let g = document.getElementsByClassName("line")[0];
        g.addEventListener("click", (ee) => {
            let y = (ee.offsetX / ee.target.getBoundingClientRect().width) * 100;
            let eee = document.getElementsByClassName("linecircle")[0];
            eee.style.left = y + "%";
            currents.currentTime = (currents.duration) * y / 100;
        });
    }
}

async function playmusic2(i, p = false) {
    console.log(i)
    if (p == true) {
        i = "/NEW SONGS/" + i  + ".mp3";
        currents.src = i;
        currents.pause();
        let q = document.getElementsByClassName("musicdurationinfo")[0];
        q.innerHTML = "00:00/00:00";

        currents.addEventListener("timeupdate", () => {
            let q = document.getElementsByClassName("musicdurationinfo")[0];
            q.innerHTML = `${formatTime(currents.currentTime)}/${formatTime(currents.duration)}`;
            let e = document.getElementsByClassName("linecircle")[0];
            e.style.left = ((currents.currentTime) / (currents.duration)) * 100 + "%";
        });

        let g = document.getElementsByClassName("line")[0];
        g.addEventListener("click", (ee) => {
            let y = (ee.offsetX / ee.target.getBoundingClientRect().width) * 100;
            let eee = document.getElementsByClassName("linecircle")[0];
            eee.style.left = y + "%";
            currents.currentTime = (currents.duration) * y / 100;
        });

        let n = document.getElementsByClassName("playy")[0];
        n.src = "SVG/play2.svg";
        let u = document.getElementsByClassName("musicnameinfo")[0];
        u.innerHTML = i.replace("/NEW SONGS/", "");
    }
    else {
        i = "/NEW SONGS/" + i + "128 Kbps" + ".mp3";
        currents.src = i;
        currents.play();
        let n = document.getElementsByClassName("playy")[0];
        n.src = "SVG/pause.svg";
        let u = document.getElementsByClassName("musicnameinfo")[0];
        u.innerHTML = i.replace("/NEW SONGS/", "");

        currents.addEventListener("timeupdate", () => {
            let q = document.getElementsByClassName("musicdurationinfo")[0];
            q.innerHTML = `${formatTime(currents.currentTime)}/${formatTime(currents.duration)}`;
            let e = document.getElementsByClassName("linecircle")[0];
            e.style.left = ((currents.currentTime) / (currents.duration)) * 100 + "%";
        });

        let g = document.getElementsByClassName("line")[0];
        g.addEventListener("click", (ee) => {
            let y = (ee.offsetX / ee.target.getBoundingClientRect().width) * 100;
            let eee = document.getElementsByClassName("linecircle")[0];
            eee.style.left = y + "%";
            currents.currentTime = (currents.duration) * y / 100;
        });
    }
}

async function write() {
    let arr = await getsongs();
    let divv = document.getElementsByClassName("containerr")[0];

    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        let inner = `<div class="boxmain">
                        <img class="invert" src="SVG/music.svg" alt="">
                        <div class="musicname">${element}</div>
                        <img class="invert" src="SVG/forward.svg" alt="">
                    </div>`;
        divv.innerHTML += inner;
    }

    let aa = document.getElementsByClassName("boxmain");
    playmusic(aa[0].children[1].innerHTML, true);
    for (let index = 0; index < aa.length; index++) {
        const element = aa[index];
        let p = element.children[1].innerHTML;
        element.addEventListener("click", () => {
            playmusic(p);
        });
    }

    let n = document.getElementsByClassName("playy")[0];
    n.addEventListener("click", () => {
        if (currents.paused) {
            n.src = "SVG/pause.svg";
            currents.play();
        }
        else {
            n.src = "SVG/play2.svg";
            currents.pause();
        }
    });
}

async function set() {
    let array = [];
    let a = await fetch("/MUSIC ICON/icons.json");
    let data = await a.json();
    for (let i = 0; i < data.length; i++) {
        array.push("/MUSIC ICON/" + encodeURIComponent(data[i]));
    }
    return array;
}

async function main(params) {
    await write();

    let q = document.getElementsByClassName("menu")[0];
    q.addEventListener("click", () => {
        document.getElementsByClassName("leftmain")[0].style.zIndex = 1;
        document.getElementsByClassName("headimg")[0].src = "SVG/exit.svg";
    });

    let a = document.getElementsByClassName("headimg")[0];
    a.addEventListener("click", () => {
        document.getElementsByClassName("leftmain")[0].style.zIndex = 0;
    });

    let arr = await getsongs();
    let u = await set();

    // --- PREVIOUS BUTTON ---
    let aa = document.getElementsByClassName("backward")[0];
    aa.addEventListener("click", () => {
        // SONGS array
        let currentSong = decodeURIComponent(currents.src.split("/SONGS/").pop() || "");
        for (let index = 0; index < arr.length; index++) {
            if (arr[index] === currentSong && index - 1 >= 0) {
                playmusic(arr[index - 1]);
                console.log("ghvhjh")
            }
        }
        // U array

        let currentPathU = decodeURIComponent(new URL(currents.src).pathname);
        console.log(currentPathU)
        for (let index = 0; index < u.length; index++) {
            let mp3Path = decodeURIComponent(
                u[index].replace("/MUSIC ICON/", "/NEW SONGS/").replace(".jpg", ".mp3")
            );

            
            if (mp3Path === currentPathU && index - 1 >= 0) {
                let songName = decodeURIComponent(
                    u[index - 1].split("ICON/")[1].replace(".jpg", "").replaceAll("128 Kbps", "").trim()
                );
                console.log("kjenfe")
                console.log(songName.replaceAll("128 Kbps",""))
                playmusic2(songName.replaceAll("128 Kbps",""));
                
            }
        }
    });

    // --- NEXT BUTTON ---
    let bb = document.getElementsByClassName("forward")[0];
    bb.addEventListener("click", () => {
        // SONGS array
        let currentSong = decodeURIComponent(currents.src.split("/SONGS/").pop() || "");
        for (let index = 0; index < arr.length; index++) {
            if (arr[index] === currentSong && index + 1 < arr.length) {
                playmusic(arr[index + 1]);
                break;
            }
        }
        // U array
        let currentPathU = decodeURIComponent(new URL(currents.src).pathname);
        for (let index = 0; index < u.length; index++) {
            let mp3Path = decodeURIComponent(
                u[index].replace("/MUSIC ICON/", "/NEW SONGS/").replace(".jpg", ".mp3")
            );
            if (mp3Path === currentPathU && index + 1 < u.length) {
                let songName = decodeURIComponent(
                    u[index + 1].split("ICON/")[1].replace(".jpg", "").replace("128 Kbps", "").trim()
                );
                playmusic2(songName.replaceAll("128 Kbps",""));
                break;
            }
        }
    });

    // Box grid for u[]
    for (let index = 0; index < u.length; index++) {
        const element = u[index];
        let html = `<div class="box1">
                        <img src="${element}" alt="">
                        <p class="pfirst">${element.split("ICON/")[1].replaceAll("%20", " ").replaceAll(".jpg", "").replaceAll("128 Kbps", "")}</p>
                        <div class="playbtn">
                            <img src="SVG/play.svg" alt="">
                        </div>
                    </div>`;
        document.getElementsByClassName("boxx")[0].innerHTML += html;
    }

    let ii = document.getElementsByClassName("box1");
    for (let index = 0; index < ii.length; index++) {
        const element = ii[index];
        element.getElementsByClassName("playbtn")[0].addEventListener("click", () => {
            let s = element.getElementsByClassName("pfirst")[0].innerHTML;
            playmusic2(s);
        });
    }
}

main();
