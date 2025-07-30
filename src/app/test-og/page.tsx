export default function TestOGPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl">
        <h1 className="text-3xl font-bold mb-4">Open Graph Test Page</h1>
        <p className="text-gray-600 mb-4">
          This page is for testing Open Graph metadata. When you share this page on social media,
          it should display the Whale Shark Solutions logo.
        </p>
        <div className="bg-gray-50 p-4 rounded">
          <h2 className="font-semibold mb-2">Expected Open Graph Data:</h2>
          <ul className="text-sm space-y-1">
            <li><strong>Title:</strong> Whale Shark Solutions</li>
            <li><strong>Description:</strong> Streamlining workflows and boosting team productivity...</li>
            <li><strong>Image:</strong> /images/wsMainDark.png</li>
            <li><strong>URL:</strong> https://whalesharksolutions.com</li>
          </ul>
        </div>
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Testing Tools:</h3>
          <ul className="text-sm space-y-1">
            <li>• <a href="https://developers.facebook.com/tools/debug/" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Facebook Sharing Debugger</a></li>
            <li>• <a href="https://cards-dev.twitter.com/validator" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Twitter Card Validator</a></li>
            <li>• <a href="https://www.opengraph.xyz/" target="_blank" rel="noopener" className="text-blue-600 hover:underline">OpenGraph.xyz</a></li>
            <li>• <a href="https://metatags.io/" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Meta Tags Preview</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
} 