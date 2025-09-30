import React from 'react';

const App = () => {
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-col">
      <header className="text-white">
        {/* Navbar will go here */}
        <h1 className="text-3xl font-bold">Navbar</h1>
      </header>

      <main className="flex-grow text-white">
        {/* Main page content will go here */}
        <p>Main Content</p>
      </main>

      <footer className="text-white text-center">
        {/* Footer will go here */}
        <p>Footer</p>
      </footer>
    </div>
  )
}

export default App