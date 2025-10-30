import React from "react";
import styles from "../css/SocialButton.module.css";

export default function SocialButton({ icon, provider }) {
    const handleSocialLogin = () => {
        const oauthUrls = {
            GitHub:
                "https://github.com/login/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=user:email",
            GitLab:
                "https://gitlab.com/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=read_user",
            Google:
                "https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=email%20profile",
    };

        const url = oauthUrls[provider];
        console.log(`${provider} OAuth URL:`, url);
        window.location.href = url;
    };

    return (
        <button className={styles.button} onClick={handleSocialLogin}>
            {icon}
            <span>{provider}로 계속하기</span>
        </button>
    );
}
