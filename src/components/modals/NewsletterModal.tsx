"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { usePathname } from "next/navigation";

export default function NewsletterModal() {
  const pathname = usePathname();
  const formRef = useRef<HTMLFormElement>(null);
  const [success, setSuccess] = useState<boolean>(true);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const modalElement = useRef<HTMLDivElement>(null);

  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const sendMail = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("sendMail");

    // if (formRef.current) {
    //   emailjs
    //     .sendForm(
    //       "service_noj8796", // EmailJS service ID
    //       "template_fs3xchn", // EmailJS template ID
    //       formRef.current,
    //       "iG4SCmR-YtJagQ4gV" // EmailJS public key
    //     )
    //     .then((res) => {
    //       if (res.status === 200) {
    //         setSuccess(true);
    //         handleShowMessage();
    //         if (formRef.current) formRef.current.reset();
    //       } else {
    //         setSuccess(false);
    //         handleShowMessage();
    //       }
    //     })
    //     .catch(() => {
    //       setSuccess(false);
    //       handleShowMessage();
    //     });
    // }
  };

  useEffect(() => {
    if (pathname === "/") {
      const loadBootstrap = async () => {
        const bootstrap = await import("bootstrap");

        if (modalElement.current) {
          const myModal = new bootstrap.Modal(
            document.getElementById("newsletterPopup")!,
            {
              keyboard: false,
            }
          );
          myModal.show();

          modalElement.current.addEventListener("hidden.bs.modal", () => {
            myModal.hide();
          });
        }
      };
      loadBootstrap();
    }
  }, [pathname]);

  return (
    <div
      ref={modalElement}
      className="modal modalCentered fade auto-popup modal-newleter"
      id="newsletterPopup"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-top">
            <Image
              className="lazyload"
              data-src="/images/item/banner-newleter.jpg"
              alt="Newsletter"
              width={938}
              height={538}
              src="/images/item/banner-newleter.jpg" // Always provide the `src`
            />
            <span
              className="icon icon-close btn-hide-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="modal-bottom">
            <h4 className="text-center">Don’t miss out</h4>
            <h6 className="text-center">
              Be the first one to get new products at early bird prices.
            </h6>
            <div className={`tfSubscribeMsg ${showMessage ? "active" : ""}`}>
              {success ? (
                <p style={{ color: "rgb(52, 168, 83)" }}>
                  You have successfully subscribed.
                </p>
              ) : (
                <p style={{ color: "red" }}>Something went wrong</p>
              )}
            </div>
            <form
              ref={formRef}
              onSubmit={sendMail} // Form submission handler
              className="form-newsletter"
              method="post"
              acceptCharset="utf-8"
              data-mailchimp="true"
            >
              <div id="subscribe-content">
                <input
                  required
                  type="email"
                  name="email-form"
                  placeholder="Email *"
                  autoComplete="abc@xyz.com"
                />
                <button
                  type="submit"
                  className="tf-btn btn-fill radius-3 animate-hover-btn w-100 justify-content-center"
                >
                  Keep me updated
                </button>
              </div>
              <div id="subscribe-msg" />
            </form>
            <div className="text-center">
              <a
                href="#"
                data-bs-dismiss="modal"
                className="tf-btn btn-line fw-6 btn-hide-popup"
              >
                Not interested
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
