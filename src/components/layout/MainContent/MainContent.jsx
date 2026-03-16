import React from 'react';

const MainContent = ({ children }) => {
  return (
    <main className="flex-1 overflow-y-auto bg-blue-50">
      {children}
    </main>
  );
};

export default MainContent;