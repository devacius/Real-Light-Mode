1. You can directly use that in a react based project. 
2. It adds a single overlay component over your existing design page. and give more z value to this then your existing project. 
you can this like this in your current App.tsx
```
function RealLightManager() {
  const { theme } = useTheme();
  return theme === 'real-light' ? <RealLightOverlay /> : null;
}```
