"use client"
import Link from 'next/link';
import React from 'react';
import LinkIcon from '@mui/icons-material/Link';
import { Facebook, GitHub, Instagram, Twitter, YouTube, LinkedIn } from '@mui/icons-material';
import { FaStackOverflow } from 'react-icons/fa';
const SocialLink = ({
    name, urlLink,
    isShare = false,
}) => {
    const socialLink = name?.toLowerCase();

    switch (socialLink) {
        case "facebook":
            return <a href={isShare ? `https://www.facebook.com/share.php?u=${urlLink}` : `https://${urlLink}`}

                target="_blank"
                style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: "#0079D110",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Facebook
                    style={{
                        fontSize: 18,
                    }}
                    color="primary"
                />
            </a>
        case "instagram":
            return <a href={isShare ? `https://www.instagram.com/?url=${urlLink}` : `https://${urlLink}`}
                target="_blank"
                style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: "#0079D110",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Instagram
                    style={{
                        fontSize: 18,
                    }}
                    color="primary"
                />
            </a>
        case "linkedin":
            return <a href={isShare ? `https://www.linkedin.com/sharing/share-offsite/?url=${urlLink}` : `https://${urlLink}`}

                target="_blank"
                style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: "#0079D110",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}

            >
                <LinkedIn
                    style={{
                        fontSize: 18,
                    }}
                    color="primary"
                />
            </a>
        case "twitter":
            return <a target="_blank" href={isShare ? `http://www.twitter.com/share?url=${urlLink}` : `https://${urlLink}`}
                style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: "#0079D110",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}

            >
                <Twitter
                    style={{
                        fontSize: 18,
                    }}
                    color="primary"
                />
            </a>
        case "github":
            return <a target="_blank" href={isShare ? `https://www.facebook.com/share.php?u=${urlLink}` : `https://${urlLink}`}
                style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: "#0079D110",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}

            >
                <GitHub
                    style={{
                        fontSize: 18,
                    }}
                    color="primary"
                />
            </a>
        case "youtube":
            return <a target="_blank" href={isShare ? `https://www.facebook.com/share.php?u=${urlLink}` : `https://${urlLink}`}
                style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: "#0079D110",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}

            >
                <YouTube
                    style={{
                        fontSize: 18,
                    }}
                    color="primary"
                />
            </a>
        case "stackoverflow":
            return <a target="_blank" href={isShare ? `https://www.facebook.com/share.php?u=${urlLink}` : `https://${urlLink}`}
                style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: "#0079D110",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}

            >
                <FaStackOverflow
                    style={{
                        fontSize: 18,
                        color: "#0079D1",
                    }}
                />
            </a>
        default:
            return <a target="_blank" style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: "#0079D110",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }} href={isShare ? `https://www.facebook.com/share.php?u=${urlLink}` : `https://${urlLink}`}>
                <LinkIcon
                    style={{
                        fontSize: 18,
                    }}
                    color="primary"

                />
            </a>
    }

};
//
export default SocialLink;