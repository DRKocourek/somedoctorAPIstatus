const hostapi = document.getElementById("24data");
const backend = document.getElementById("backend");
const tunnels = document.getElementById("tunnels");
const prg = document.getElementById("prg");
const pages = document.getElementById("pages");
const eu01 = document.getElementById("eu-prg-01");
const eu02 = document.getElementById("eu-prg-02");


async function getGithubPagesStatus() {
  const response = await fetch("https://www.githubstatus.com/api/v2/summary.json");
  const data = await response.json();

  const pagesStatus = data.components.find(
    component => component.name === "Pages"
  )?.status;

  if (pagesStatus == "operational") {
    return true
  } else {
    return false
  }
}

async function getEU01Status() {
  let response
  try{
    response = await fetch("https://somedoctorapi-eu-prg01.drkocourek.stream/api/teapot");
  } catch(err) {
    return false;
  }
    if (response.status == 418) {
      return true;
    } else {
      return false;
    }
}

async function getEU02Status() {
  let response
  try{
    response = await fetch("https://somedoctorapi-eu-prg02.drkocourek.stream/api/teapot");
  } catch(err) {
    return false;
  }
    if (response.status == 418) {
      return true;
    } else {
      return false;
    }
}


async function getAPIStatus(eu01Status, eu02Status){
  let response;
  if (eu01Status) {
    response = await fetch("https://somedoctorapi-eu-prg01.drkocourek.stream/api/datahealth");
  } else if (eu02Status) {
    response = await fetch("https://somedoctorapi-eu-prg02.drkocourek.stream/api/datahealth");
  }
  let data = await response.json();
  if (data) {
    return true;
  } else {
    return false;
  }
}

async function getCloudflareTunnelsStatus(){
  const response = await fetch("https://www.cloudflarestatus.com/api/v2/summary.json");
  const data = await response.json();

  const tunnelStatus = data.components.find(
    component => component.name === "Tunnel"
  )?.status;

  if (tunnelStatus == "operational") {
    return true
  } else {
    return false
  }
}

async function getCloudflarePRGStatus(){
  const response = await fetch("https://www.cloudflarestatus.com/api/v2/summary.json");
  const data = await response.json();

  const tunnelStatus = data.components.find(
    component => component.name === "Prague, Czech Republic - (PRG)"
  )?.status;

  if (tunnelStatus == "operational") {
    return true
  } else {
    return false
  }
}

async function main() {
    let pagesStatus = await getGithubPagesStatus();

    if (pagesStatus) {
        pages.setAttribute('class', 'online');
        pages.textContent = "Online";
    } else {
        pages.setAttribute('class', 'offline');
        pages.textContent = "Offline";
    }
    let backendStatus = false;
    let eu01Status = await getEU01Status();
    if (eu01Status) {
        backend.setAttribute('class', 'online');
        backend.textContent = "Online";
        eu01.setAttribute('class', 'online');
        eu01.textContent = "Online";
        backendStatus = true;
    } else {
        eu01.setAttribute('class', 'offline');
        eu01.textContent = "Offline";
    }
    let eu02Status = await getEU02Status();
    if (eu02Status) {
        backend.setAttribute('class', 'online');
        backend.textContent = "Online";
        eu02.setAttribute('class', 'online');
        eu02.textContent = "Online";
        backendStatus = true;
    } else {
        eu02.setAttribute('class', 'offline');
        eu02.textContent = "Offline";
    }

    if (!eu01Status && !eu02Status) {
        backend.setAttribute('class', 'offline');
        backend.textContent = "Offline";
    }
    let dataStatus = await getAPIStatus(eu01Status, eu02Status);
    if (backendStatus) {
      if (dataStatus) {
          hostapi.setAttribute('class', 'online');
          hostapi.textContent = "Online";
      } else {
          hostapi.setAttribute('class', 'offline');
          hostapi.textContent = "Offline";
      }
    } else {
      hostapi.setAttribute('class', 'unknown');
      hostapi.textContent = "Unknown";
    }

    let tunnelStatus = await getCloudflareTunnelsStatus();

    if (tunnelStatus) {
        tunnels.setAttribute('class', 'online');
        tunnels.textContent = "Online";
    } else {
        tunnels.setAttribute('class', 'offline');
        tunnels.textContent = "Offline";
    }

    let prgStatus = await getCloudflarePRGStatus();
    if (prgStatus) {
        prg.setAttribute('class', 'online');
        prg.textContent = "Online";
    } else {
        prg.setAttribute('class', 'offline');
        prg.textContent = "Offline";
    }
}

main();