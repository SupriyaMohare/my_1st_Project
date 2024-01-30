"use client";

import { stripeRedirect } from "@/actions/stripe-redirect";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAction } from "@/hooks/use-action";
import { useProModal } from "@/hooks/use-pro-modal";
import { error } from "console";
import Image from "next/image";
import { toast } from "sonner";


export const ProModal = () => {

    const proModal = useProModal();

    const { execute, isLoading } = useAction(stripeRedirect,
        {
            onSuccess: (data) => {
                window.location.href = data;
            },
            onError: (error) => {
                toast.error(error);
            }
        });


    const onclick = () => {
        execute({});

    };



    return (

        <Dialog
            open={proModal.isOpen}
            onOpenChange={proModal.onClose}>
            <DialogContent className="mex-w-md p-0 overflow-hidden">
                <div className="aspect-video relative flex items-center justify-center">
                    <Image
                        src="/hero.svg"
                        alt="Hero"
                        className="object-cover"
                        fill />
                </div>

                <div className="text-neutral-700 mx-auto space-y-6 p-6">
                    <h2 className="font-semibold text-xl">
                        Ugpgrade to taskify Pro Today!!
                    </h2>
                    <p className="text-xs font-semibold text-neutral-600">
                        Explore the best of Taskify
                    </p>

                    <div className="pl-3">
                        <ul className="text-sm list-disc">
                            <li>Unlimited boards</li>
                            <li>Advance checkLists</li>
                            <li>Admin and security feature</li>
                            <li> And more !</li>
                        </ul>
                    </div>
                    <Button
                    disabled={isLoading}
                    onClick={onclick}
                     className="w-full"
                        variant="primary">
                        Upgrade
                    </Button>
                </div>

            </DialogContent>
        </Dialog>
    );
};