# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Building the Project

To build the project for production:

```sh
npm run build
```

This will create an optimized production build in the `dist` folder.

To preview the production build locally:

```sh
npm run preview
```

## How can I deploy this project?

### Automated Deployment with GitHub Actions

This project is configured with GitHub Actions for automated deployment to GitHub Pages. The deployment workflow will:

1. Automatically trigger on every push to the `main` branch
2. Install dependencies and build the project
3. Deploy the built files to GitHub Pages

To enable GitHub Pages deployment:

1. Go to your repository settings on GitHub
2. Navigate to **Pages** in the left sidebar
3. Under **Source**, select **GitHub Actions**
4. The website will be available at: `https://<username>.github.io/<repository-name>/`

### Custom Domain

This project is configured to use the custom domain: **todofocas.com**

The CNAME file is already set up. To activate the custom domain:

1. Configure your DNS provider to point to GitHub Pages:
   - Add a CNAME record pointing to `<username>.github.io`
   - Or add A records pointing to GitHub's IP addresses
2. In your repository settings, go to **Pages** and enter your custom domain
3. Wait for DNS propagation (can take up to 24-48 hours)

### Manual Deployment

You can also use [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish for manual deployment.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
