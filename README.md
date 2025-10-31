![AI Recruiter Homepage](public/logo.png)
# Full Stack Job Portal
This project is a **Full Stack Job Portal App** named "JobifyX," which demonstrates the key skills that companies look for today. It features **authentication, job postings, applications, profile management**, and more. The app provides both **candidate** and **recruiter** functionality, offering a comprehensive platform for job seekers and employers alike.

![JobifyX Logo](./public/banner.jpeg)


## Technologies Used:
- **Frontend**: ReactJS, ShadCN UI
- **State Management**: React Hook Form, Zod
- **Authentication**: Clerk
- **Cloud Storage**: Storage Buckets for resume uploads
- **Markdown**: For rich text job descriptions


## Key Features:
- **Authentication**: Users can sign in using **Google** or **email and password** authentication powered by **Clerk**.
- **Responsive UI**: The user interface is fully responsive, built with **ReactJS** and **ShadCN UI**, ensuring a modern and professional look on all devices.
- **Job Postings**: 
  - **Candidates** can browse, apply, and wish-list jobs.
  - **Recruiters** can post new jobs, manage applications, and track hiring status.
- **Application Tracking**: Candidates can view the status of their applications, whether they are in the "applied" or "interviewing" phase.
- **Resume Upload**: Candidates can upload their resumes via **storage buckets**.
- **Job Filters**: Users can filter jobs based on location, company, and role, with options to save jobs for later viewing.
- **Markdown Job Descriptions**: Recruiters can use **Markdown** to format job descriptions, allowing them to add headings, bullet points, and more.
- **Profile Management**: Users can view and manage their **profile, saved jobs, applied jobs**, and account details.
- **State Management**: React state management and form handling are done via **React Hook Form** and **Zod Validation**.
- **Real-Time Status Updates**: Recruiters can update the status of applications (e.g., "interviewing"), and candidates will see these updates on their profile.

## Application Flow:
### 1. Candidates:
- Sign in, view job listings, and apply with resume uploads.
- Track their job application status in real time.
- Filter jobs based on various criteria (e.g., location, company).
- Save favorite jobs to a wish list.

### 2. Recruiters:
- Sign in to post jobs with detailed descriptions using Markdown.
- Manage applications by updating the hiring status of candidates.
- Track posted jobs and delete or modify postings as needed.



### Make sure to create a `.env` file with following variables -

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_CLERK_PUBLISHABLE_KEY=
```


## How to Run:
1. Clone the repository.
2. Install the required dependencies:
   ```bash
   npm install

3. Start the development server:
   ```bash
   npm run dev
4. Open the app in your browser at [http://localhost:3000](http://localhost:3000).
