
# Deployment Instructions (Vercel)

You can deploy directly to Vercel using the Vercel CLI.

1.  **Install Vercel CLI (optional but recommended)**:
    ```bash
    npm i -g vercel
    ```

2.  **Deploy**:
    Run the following command in your terminal:
    ```bash
    npx vercel
    ```
    Follow the prompts to log in (if needed) and deploy.

3.  **Environment Variables**:
    After deployment, configure your environment variables in the Vercel Dashboard under **Settings > Environment Variables**:
    - `VITE_SUPABASE_URL`
    - `VITE_SUPABASE_ANON_KEY`
    (Copy these from your local `.env` file)

4.  **Redeploy**:
    If you add environment variables after the first deployment, trigger a redeploy in Vercel.
