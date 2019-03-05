# Animations

Most all of the charts support animation transitions
for enter/update/exit. The animations are turned on
by default but can be disabled (see chart for specific apis).

Animations are often rewritten off as a pretty effect but
transitions for updates can be very useful to tell a story
for how the data is changing in real time.

REAVIZ uses [react-pose](https://popmotion.io/pose/) for handling
animations. react-pose allows us to define animations as components
and react-pose will handle animating the props directly outside
of the react render cycle for smooth transitions.
