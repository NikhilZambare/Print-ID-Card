# Print ID Card Task - Student ID Card Generator

This project is a web-based application that generates student ID cards in PDF format. The ID cards are created based on student data retrieved from an external API and contain essential details such as the student’s name, ID, contact information, and profile picture. The generated PDF is downloadable via a simple web interface.

## Features
- Fetches student data from an external API (`https://freetestapi.com/api/v1/students`).
- Generates student ID cards in PDF format.
- Allows downloading of the generated PDF containing all the student ID cards.
- Customizable design for the ID card, including the school logo and student details.
- Supports a paginated format for large numbers of students.

## Installation

Follow the steps below to set up the project locally:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/NikhilZambare/Print-ID-Card.git
   cd Print-ID-Card
   npm install
   node app.js

   Accees API: http://localhost:3000/api/download-id-cards
