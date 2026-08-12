const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;


// ==============================
// Campus Connect Data
// ==============================

const events = [
    {
        name: "College Hackathon",
        location: "Innovation Lab",
        date: "20 August 2026"
    },
    {
        name: "Tech Fest 2026",
        location: "Main Auditorium",
        date: "25 August 2026"
    },
    {
        name: "Cultural Fest",
        location: "College Ground",
        date: "30 August 2026"
    }
];


const clubs = [
    {
        name: "Coding Club",
        description: "Learn programming and participate in coding events."
    },
    {
        name: "Photography Club",
        description: "Explore photography and creative activities."
    },
    {
        name: "Literary Club",
        description: "Improve writing, reading and communication skills."
    },
    {
        name: "Music Club",
        description: "Join students interested in music and performances."
    }
];


const announcements = [
    {
        title: "Hackathon Registration",
        message: "Registration is now open for the upcoming college hackathon."
    },
    {
        title: "Internal Assessment",
        message: "Students are requested to check the assessment schedule."
    },
    {
        title: "Club Recruitment",
        message: "Students can now join their interested campus clubs."
    }
];


let registrations = [];
let clubMembers = [];


// ==============================
// Helper Function
// ==============================

function sendJSON(response, data, statusCode = 200) {

    response.writeHead(statusCode, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    });

    response.end(JSON.stringify(data));
}


// ==============================
// Server
// ==============================

const server = http.createServer((request, response) => {

    console.log(`${request.method} ${request.url}`);


    // --------------------------
    // Home Page
    // --------------------------

    if (request.url === "/" && request.method === "GET") {

        const filePath = path.join(__dirname, "index.html");

        fs.readFile(filePath, (error, data) => {

            if (error) {

                response.writeHead(500);
                response.end("Unable to load index.html");

                return;
            }

            response.writeHead(200, {
                "Content-Type": "text/html"
            });

            response.end(data);
        });

        return;
    }


    // --------------------------
    // CSS File
    // --------------------------

    if (request.url === "/style.css" && request.method === "GET") {

        const filePath = path.join(__dirname, "style.css");

        fs.readFile(filePath, (error, data) => {

            if (error) {

                response.writeHead(404);
                response.end("CSS file not found");

                return;
            }

            response.writeHead(200, {
                "Content-Type": "text/css"
            });

            response.end(data);
        });

        return;
    }


    // --------------------------
    // Events API
    // --------------------------

    if (request.url === "/api/events" && request.method === "GET") {

        sendJSON(response, events);

        return;
    }


    // --------------------------
    // Clubs API
    // --------------------------

    if (request.url === "/api/clubs" && request.method === "GET") {

        sendJSON(response, clubs);

        return;
    }


    // --------------------------
    // Announcements API
    // --------------------------

    if (
        request.url === "/api/announcements" &&
        request.method === "GET"
    ) {

        sendJSON(response, announcements);

        return;
    }


    // --------------------------
    // Event Registration
    // --------------------------

    if (
        request.url === "/api/register" &&
        request.method === "POST"
    ) {

        let body = "";

        request.on("data", chunk => {
            body += chunk;
        });

        request.on("end", () => {

            try {

                const data = JSON.parse(body);

                registrations.push({
                    student: data.student,
                    event: data.event
                });

                sendJSON(response, {
                    success: true,
                    message: `Successfully registered for ${data.event}!`
                });

            } catch (error) {

                sendJSON(response, {
                    success: false,
                    message: "Invalid request."
                }, 400);
            }

        });

        return;
    }


    // --------------------------
    // Club Joining
    // --------------------------

    if (
        request.url === "/api/join-club" &&
        request.method === "POST"
    ) {

        let body = "";

        request.on("data", chunk => {
            body += chunk;
        });

        request.on("end", () => {

            try {

                const data = JSON.parse(body);

                clubMembers.push({
                    student: data.student,
                    club: data.club
                });

                sendJSON(response, {
                    success: true,
                    message: `You joined ${data.club}!`
                });

            } catch (error) {

                sendJSON(response, {
                    success: false,
                    message: "Invalid request."
                }, 400);
            }

        });

        return;
    }


    // --------------------------
    // 404
    // --------------------------

    response.writeHead(404, {
        "Content-Type": "text/plain"
    });

    response.end("404 - Page Not Found");

});


server.listen(PORT, () => {

    console.log("--------------------------------");
    console.log("🎓 CAMPUS CONNECT SERVER");
    console.log("--------------------------------");
    console.log(`Server running at: http://localhost:${8888}`);
    console.log("Press Ctrl + C to stop the server.");
});