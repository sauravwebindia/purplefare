export const GTMPageView = (url) => {
    interface PageEventProps {
        event: string;
        page: string;
    }

    const pageEvent: PageEventProps = {
        event: 'pageview',
        page: url,
    };
    //@ts-ignore
    window && window.dataLayer && window.dataLayer.push(pageEvent);
    return pageEvent;
};