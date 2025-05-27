declare global{
    interface Window {
        grecaptcha:{
            ready: (cb:()=> void) => void;
            execute: (siteKey: string, options: { action: string }) => Promise<string>;
        }
    }
}
export default function useRecaptcha() {
  const executeRecaptcha = async (action: string): Promise<string> => {
    if (!window.grecaptcha) {
      console.error("reCAPTCHA API is not loaded.");
      throw new Error("reCAPTCHA API is not loaded.");
    }

    try {
      const token = await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string,
        { action }
      );
      return token;
    } catch (error) {
      console.error("Error executing reCAPTCHA:", error);
      throw error;
    }
  };

  return { executeRecaptcha };
}

