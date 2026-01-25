const hostapi = document.getElementById("24data");
const backend = document.getElementById("backend");
const tunnels = document.getElementById("tunnels");
const prg = document.getElementById("prg");
const pages = document.getElementById("pages");

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

async function getBackendStatus() {
  let response
  try{
    response = await fetch("https://somedoctorapi.drkocourek.stream/api/teapot");
  } catch(err) {
    return false;
  }
    if (response.status == 418) {
      return true;
    } else {
      return false;
    }
}

async function getAPIStatus(){
  let response = await fetch("https://somedoctorapi.drkocourek.stream/api/datahealth");
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
    let backendStatus = await getBackendStatus();
    if (backendStatus) {
        backend.setAttribute('class', 'online');
        backend.textContent = "Online";
    } else {
        backend.setAttribute('class', 'offline');
        backend.textContent = "Offline";
    }
    let dataStatus = await getAPIStatus();
    console.log(backendStatus);
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