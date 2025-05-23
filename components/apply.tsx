"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function ApplyButton() {
    const router = useRouter();

    return (
        <Button
            variant="destructive"
            size="sm"
            onClick={() => {
                window.location.href = "mailto:jobs@pragmaticdigital.co.uk?subject=Job Application";
            }}
        >
            Apply Now
        </Button>
    );
}
