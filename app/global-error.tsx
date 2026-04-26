'use client'

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string }
}) {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : ''

  // Log the error to the console so it will be forwarded to server logs and captured by auto-fix
  console.error(error)

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Application Error</title>
        <style>{`
          * { box-sizing: border-box; }
          html, body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          }
          body {
            padding: 2rem;
            background: #fafafa;
            color: #171717;
            font-size: 14px;
            min-height: 100vh;
            display: flex;
            align-items: flex-start;
          }
          main {
            width: 100%;
            max-width: 560px;
            min-width: 0;
          }
          .error-header {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 1rem;
          }
          .error-icon {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #fef2f2;
            color: #b91c1c;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 14px;
            flex-shrink: 0;
            margin-top: 0.25rem;
          }
          h1 {
            margin: 0;
            font-size: 16px;
            font-weight: 600;
            line-height: 1.5;
          }
          h1 code {
            background: #e5e5e5;
            padding: 0.1em 0.3em;
            border-radius: 2px;
            font-family: 'Monaco', 'Courier New', monospace;
            font-size: 0.9em;
          }
          .error-message {
            margin: 0.5rem 0 0 2rem;
            padding: 0;
            font-size: 13px;
            color: #b91c1c;
            line-height: 1.6;
          }
          .error-details {
            margin: 1.5rem 0 0 2rem;
          }
          .error-details summary {
            cursor: pointer;
            padding: 0.5rem 0;
            color: #737373;
            font-size: 12px;
            user-select: none;
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 500;
            transition: color 0.2s ease;
          }
          .error-details summary:hover {
            color: #525252;
          }
          .error-details summary::-webkit-details-marker {
            display: none;
          }
          .error-details summary .chevron {
            display: inline-flex;
            align-items: center;
            font-size: 0.6rem;
            transition: transform 0.2s ease;
            transform: rotate(-90deg);
          }
          .error-details[open] summary .chevron {
            transform: rotate(0deg);
          }
          .error-stack {
            margin: 0.75rem 0 0 0;
            padding: 1rem;
            background: #f5f5f5;
            border: 1px solid #e5e5e5;
            border-radius: 4px;
            overflow: auto;
            max-width: 100%;
            min-width: 0;
            max-height: 320px;
            font-family: 'Monaco', 'Courier New', monospace;
            font-size: 11px;
            line-height: 1.5;
            color: #525252;
          }
        `}</style>
      </head>
      <body>
        <main role="main">
          <article role="alert">
            <div className="error-header">
              <div className="error-icon" aria-hidden="true">
                ⚠
              </div>
              <div>
                <h1>
                  An application error has occurred while loading{' '}
                  <code>{pathname || '/'}</code>
                </h1>
              </div>
            </div>
            <p className="error-message">
              {error.message || 'An unexpected error occurred. Please try refreshing the page.'}
            </p>
            {error.stack && (
              <details className="error-details">
                <summary>
                  <span className="chevron">▼</span>
                  View error details
                </summary>
                <pre className="error-stack">{error.stack}</pre>
              </details>
            )}
          </article>
        </main>
      </body>
    </html>
  )
}
