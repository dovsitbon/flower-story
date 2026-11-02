export const goTo = (url: string) => window.location.assign(url);

export const newOrderRef = () => `FS-${Date.now().toString(36).slice(-6).toUpperCase()}`;
