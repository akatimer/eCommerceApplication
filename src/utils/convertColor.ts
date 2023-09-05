export default function convertColor(color: string): string | undefined {
  switch (color) {
    case '#8bc34a':
      return 'green';
    case '#ff9800':
      return 'orange';
    case '#ff7f50':
      return 'coral';
    case '#f5f196':
      return 'creamy';
    case '#795548':
      return 'brown';
    case '#000000':
      return 'black';
  }
}
