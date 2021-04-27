import React from 'react';

// A COLLECTION OF SVG ICONS JS SIDE.  MIGHT BE WORTH CHANGING LATER? ~WK 3-15-2021

export function WarningIcon({ ...restProps }) {
  return (
    <svg
      {...restProps}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      className="inline w-4 mr-1 fill-current stroke-current text-warning "
    >
      <title>warning</title>
      <path d="M16 2.899l13.409 26.726h-26.819l13.409-26.726zM16 0c-0.69 0-1.379 0.465-1.903 1.395l-13.659 27.222c-1.046 1.86-0.156 3.383 1.978 3.383h27.166c2.134 0 3.025-1.522 1.978-3.383h0l-13.659-27.222c-0.523-0.93-1.213-1.395-1.903-1.395v0z"></path>
      <path d="M18 26c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"></path>
      <path d="M16 22c-1.105 0-2-0.895-2-2v-6c0-1.105 0.895-2 2-2s2 0.895 2 2v6c0 1.105-0.895 2-2 2z"></path>
    </svg>
  );
}

export function UserIcon({ ...restProps }) {
  return (
    <svg
      {...restProps}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      className="inline-block w-4 m-1 align-middle"
    >
      <title>User Icon</title>

      <path d="M18 22.082v-1.649c2.203-1.241 4-4.337 4-7.432 0-4.971 0-9-6-9s-6 4.029-6 9c0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h28c0-4.030-5.216-7.364-12-7.918z"></path>
    </svg>
  );
}

export function LocationIcon({ ...restProps }) {
  return (
    <svg
      {...restProps}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      className="inline-block w-4 m-1 align-middle"
    >
      <title>Location Icon</title>

      <path d="M16 0c-5.523 0-10 4.477-10 10 0 10 10 22 10 22s10-12 10-22c0-5.523-4.477-10-10-10zM16 16c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"></path>
    </svg>
  );
}
export function OfficeIcon({ ...restProps }) {
  return (
    <svg
      {...restProps}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      className="inline-block w-4 m-1 align-middle"
    >
      <title>Office Icon</title>

      <path d="M0 32h16v-32h-16v32zM10 4h4v4h-4v-4zM10 12h4v4h-4v-4zM10 20h4v4h-4v-4zM2 4h4v4h-4v-4zM2 12h4v4h-4v-4zM2 20h4v4h-4v-4zM18 10h14v2h-14zM18 32h4v-8h6v8h4v-18h-14z"></path>
    </svg>
  );
}
export function FilterIcon({ classNames, title, ...restProps }) {
  return (
    <svg
      {...restProps}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      className={`inline-block ${classNames}`}
    >
      <title> {title ? title : 'Filter Icon'}</title>

      <path d="M16 0c-8.837 0-16 2.239-16 5v3l12 12v10c0 1.105 1.791 2 4 2s4-0.895 4-2v-10l12-12v-3c0-2.761-7.163-5-16-5zM2.95 4.338c0.748-0.427 1.799-0.832 3.040-1.171 2.748-0.752 6.303-1.167 10.011-1.167s7.262 0.414 10.011 1.167c1.241 0.34 2.292 0.745 3.040 1.171 0.494 0.281 0.76 0.519 0.884 0.662-0.124 0.142-0.391 0.38-0.884 0.662-0.748 0.427-1.8 0.832-3.040 1.171-2.748 0.752-6.303 1.167-10.011 1.167s-7.262-0.414-10.011-1.167c-1.24-0.34-2.292-0.745-3.040-1.171-0.494-0.282-0.76-0.519-0.884-0.662 0.124-0.142 0.391-0.38 0.884-0.662z"></path>
    </svg>
  );
}

export function AttachmentPaperclipIcon({ classNames, title, ...restProps }) {
  return (
    <svg
      {...restProps}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      className={`inline-block ${classNames}`}
    >
      <title> {title ? title : 'Attachment Icon'}</title>
      <path d="M20.807 10.22l-2.030-2.029-10.15 10.148c-1.682 1.681-1.682 4.408 0 6.089s4.408 1.681 6.090 0l12.18-12.178c2.804-2.802 2.804-7.346 0-10.148-2.802-2.803-7.347-2.803-10.149 0l-12.788 12.787c-0.009 0.009-0.019 0.018-0.027 0.026-3.909 3.909-3.909 10.245 0 14.153 3.908 3.908 10.246 3.908 14.156 0 0.009-0.009 0.016-0.018 0.026-0.027l0.001 0.001 8.729-8.728-2.031-2.029-8.729 8.727c-0.009 0.008-0.018 0.018-0.026 0.026-2.784 2.783-7.312 2.783-10.096 0-2.783-2.783-2.783-7.31 0-10.093 0.010-0.009 0.019-0.018 0.028-0.026l-0.001-0.002 12.79-12.786c1.678-1.679 4.411-1.679 6.090 0s1.678 4.411 0 6.089l-12.18 12.178c-0.56 0.56-1.47 0.56-2.030 0-0.559-0.559-0.559-1.47 0-2.029l10.15-10.149z"></path>
    </svg>
  );
}

export function MailEnvelopeClosed({ classNames, title, ...restProps }) {
  return (
    <svg
      {...restProps}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      className={`inline-block ${classNames}`}
    >
      <title> {title ? title : 'Mail Envelope Closed'}</title>

      <path d="M5.315 9.274l11.185 9.726 11.187-9.728c0.194 0.184 0.313 0.445 0.313 0.735v11.986c0 0.557-0.449 1.007-1.003 1.007h-20.994c-0.564 0-1.003-0.451-1.003-1.007v-11.986c0-0.289 0.121-0.549 0.315-0.733zM6.004 8c-1.107 0-2.004 0.895-2.004 1.994v12.012c0 1.101 0.89 1.994 2.004 1.994h20.993c1.107 0 2.004-0.895 2.004-1.994v-12.012c0-1.101-0.89-1.994-2.004-1.994h-20.993zM16.5 17.7l-10-8.7h20l-10 8.7z"></path>
    </svg>
  );
}

export function MailEnvelopeOpen({ classNames, title, ...restProps }) {
  return (
    <svg
      {...restProps}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      className={`inline-block ${classNames}`}
    >
      <title> {title ? title : 'Mail Envelope Open'}</title>

      <path d="M16.5 3l-12.5 11v14.006c0 1.101 0.89 1.994 2.004 1.994h20.993c1.107 0 2.004-0.895 2.004-1.994v-14.006l-12.5-11zM13.5 23h6l7 6h-20l7-6zM16.5 4.3l11 9.7-9 8h-4l-9-8 11-9.7zM27.685 28.725l-7.685-6.708 8-7.017v13c0 0.283-0.121 0.542-0.315 0.725v0 0zM5.315 28.725v0 0c-0.194-0.183-0.315-0.442-0.315-0.725v-13l8 7.017-7.685 6.708z"></path>
    </svg>
  );
}

export function ColorPaletteIcon({ classNames, title, ...restProps }) {
  return (
    <svg
      {...restProps}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      className={`block ${classNames}`}
    >
      <title> {title ? title : 'Mail Envelope Open'}</title>

      <path d="M17.484 12q0.609 0 1.055-0.422t0.445-1.078-0.445-1.078-1.055-0.422-1.055 0.422-0.445 1.078 0.445 1.078 1.055 0.422zM14.484 8.016q0.609 0 1.055-0.445t0.445-1.055-0.445-1.055-1.055-0.445-1.055 0.445-0.445 1.055 0.445 1.055 1.055 0.445zM9.516 8.016q0.609 0 1.055-0.445t0.445-1.055-0.445-1.055-1.055-0.445-1.055 0.445-0.445 1.055 0.445 1.055 1.055 0.445zM6.516 12q0.609 0 1.055-0.422t0.445-1.078-0.445-1.078-1.055-0.422-1.055 0.422-0.445 1.078 0.445 1.078 1.055 0.422zM12 3q3.703 0 6.352 2.344t2.648 5.672q0 2.063-1.477 3.516t-3.539 1.453h-1.734q-0.656 0-1.078 0.445t-0.422 1.055q0 0.516 0.375 0.984t0.375 1.031q0 0.656-0.422 1.078t-1.078 0.422q-3.75 0-6.375-2.625t-2.625-6.375 2.625-6.375 6.375-2.625z"></path>
    </svg>
  );
}
