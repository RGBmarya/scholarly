"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./assets/ar5iv-fonts.0.7.9.min.css" 
import "./assets/ar5iv-site.0.2.2.css"
import "./assets/ar5iv.0.7.9.min.css"

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

    document.documentElement.innerHTML = htmlContent;
    return null
};