const incidents_div = document.getElementById("incidents");

async function pullIssues() {
    let response = await fetch("https://api.github.com/repos/DRKocourek/somedoctorAPIstatus/issues?state=all&per_page=20");
    let data = await response.json();
    return data;
}
async function main(){
    let issues = await pullIssues();

    for (const issue of issues) {
        if (issue.user.login === "DRKocourek") { //check if the issue was made by admin
            //create some of the needed elements
            let parent_div = document.createElement("div");
            let status = document.createElement("i");

            //check if it's a maintenance            
            let issue_type = issue.labels.find(label => label.name === "Maintenance");
            try{

            if (issue_type.name === "Maintenance"){
                //check if it's still in progress/was resolved
                let resolved = issue.labels.find(label => label.name === "Resolved");
                if (resolved === undefined) {
                    status.textContent = "In progress";
                    parent_div.setAttribute("class", "maintenance_incident");
                } else {
                    status.textContent = "Resolved";
                    parent_div.setAttribute("class", "resolved");
                }
            } 
            } catch(err) {

            } 
            try {
            if (issue_type.name === "Outage") {
                issue_type = issue.labels.find(label => label.name === "Outage");
                parent_div.setAttribute("class", "maintenance_incident");
                let resolved = issue.labels.find(label => label.name === "Resolved");
                if(resolved === undefined) {
                    status.textContent = "Investigating";
                } else {
                    status.textContent = "Resolved";
                }
            }
            } catch(err) {
                
            }
            incidents_div.appendChild(parent_div);
            let incident_title = document.createElement("h3");
            incident_title.textContent = issue.title;
            parent_div.appendChild(incident_title);
            let incident_time = document.createElement("i");
            incident_time.textContent = new Date(issue.created_at).toLocaleString('en-GB', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }) + " UTC";
            parent_div.appendChild(incident_time);
            parent_div.appendChild(document.createElement("br"));
            parent_div.appendChild(status);
            let incident_description = document.createElement("p");
            incident_description.textContent = issue.body;
            parent_div.appendChild(incident_description);
            
            //create a spacing between the incidents
            incidents_div.appendChild(document.createElement("br"));


        } else {
        }
    }
}
main();