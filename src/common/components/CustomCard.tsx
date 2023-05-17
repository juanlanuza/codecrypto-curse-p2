import Link from 'next/link';
// @mui
import ButtonBase from '@mui/material/ButtonBase';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

interface CardProps {
  title: string;
  description: string;
  logo: string;
  link: string;
}

export default function CustomCard(props: CardProps) {
  return (
    <ButtonBase LinkComponent={Link} href={props.link}>
      <Card sx={{ width: 345, p: 2 }}>
        <CardMedia
          component='img'
          height='140'
          image={props.logo}
          alt={props.title}
          sx={{ objectFit: 'contain' }}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {props.title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {props.description}
          </Typography>
        </CardContent>
      </Card>
    </ButtonBase>
  );
}
