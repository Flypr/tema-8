// Get all Projects
async function getProject() {
    var projects;
    await fetch("https://app.paymoapp.com/api/projects/", {
        headers: {
            "X-Session": "5059fe5ba060edfd2e29cf241a40d1fd"
        },
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        projects = data;
    })

    return projects;
}

// Get all Tasklists
async function getTasklist() {
    var tasklists;
    await fetch("https://app.paymoapp.com/api/tasklists/", {
        headers: {
            "X-Session": "5059fe5ba060edfd2e29cf241a40d1fd"
        },
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        tasklists = data;
    })

    return tasklists;
}

// Get all Tasks
async function getTask() {
    var tasks;
    await fetch("https://app.paymoapp.com/api/tasks/", {
        headers: {
            "X-Session": "5059fe5ba060edfd2e29cf241a40d1fd"
        },
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        tasks = data;
    })

    return tasks;
}

async function main() {
    let projects;
    let tasklists;
    let tasks;
    await getProject().then(res => {
        projects = res.projects;
    })
    await getTasklist().then(res => {
        tasklists = res.tasklists;
    })
    await getTask().then(res => {
        tasks = res.tasks;
    })

    var list = {};
    projects.forEach(element => {
        element.tasklists = {};
        let shortList = {name:element.name, tasklists:{}}
        list[element.id] = shortList;
    });

    tasklists.forEach(element => {
        element.tasks = {};
        let shortList = {name:element.name, tasks:{}}
        list[element.project_id].tasklists[element.id] = shortList;
    });

    tasks.forEach(element => {
        list[element.project_id].tasklists[element.tasklist_id].tasks[element.id] = element.name;
    });
    
    console.log(list);
}

main();

