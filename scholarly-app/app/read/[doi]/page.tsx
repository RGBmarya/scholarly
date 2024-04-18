"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Page({ params }: { params: { doi: string } }) {
    const doi = params.doi;
    const [htmlContent, setHtmlContent] = useState<string>('');
    console.log(doi)
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

    return (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
    );
};
