"use client"
import React, { useEffect, useState } from 'react';

export default function Page({ params }: { params: { doi: string } }) {
    const doi = params.doi;
    const [htmlContent, setHtmlContent] = useState<string>('');
    const [summary, setSummary] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/read/${doi}`);
                const html = await response.text();
                setHtmlContent(html);
            } catch (error) {
                // Handle the error here
            }
        };

        fetchData();
    }, [doi]);

    useEffect(() => {
        const handleMouseUp = async () => {
            const selectedText = window.getSelection()?.toString();
            if (selectedText) {
                try {
                    const response = await fetch(`/api/highlight?text=${encodeURIComponent(selectedText)}`);
                    const data = await response.text();
                    setSummary(data); // Save the data into the summary state variable
                    alert(data);
                    // Do something with the data
                } catch (error) {
                    // Handle the error here
                }
            }
        };

        const handleLinkClick = async (event: MouseEvent) => {
            const target = event.target as HTMLAnchorElement;
            if (target.tagName === 'A') {
                console.log('URL clicked:', target.href);
                const hash = target.hash.substring(1); // Get the part after the #
                const element = document.getElementById(hash); // Get the HTML element with the id

                
                if (element) {
                    const previousText = element.textContent?.slice(0, -200);
                    const spanTags = element.getElementsByTagName('span');
                    const lastSpanTag = spanTags[spanTags.length - 1];
                    console.log('Last Span Tag:', lastSpanTag);
                    
                    const aTag = lastSpanTag.querySelector('a');
                    const href = aTag?.getAttribute('href');

                    // Do something with the previousText
                    const response = await fetch(`/api/highlight?text=${previousText}&citationUrl=${href}`);
                    const data = await response.text();
                    alert(data);
                }
            }
        };

        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('click', handleLinkClick);

        return () => {
            // Clean up the event listeners when the component is unmounted
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('click', handleLinkClick);
        };
    }, []);

    document.documentElement.innerHTML = htmlContent;
    return null;
};