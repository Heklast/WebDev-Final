import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <div
      style={{
        maxWidth: '850px',
        margin: '0 auto',
        padding: '2rem 1rem',
        textAlign: 'left',
        lineHeight: 1.6,
      }}
    >
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>About Us</h1>

      <p style={{ fontSize: '1.1rem', color: '#475569' }}>
        Welcome to our book community! We are passionate about connecting
        readers with the authors and stories they love. Whether you are here to
        discover your next favorite book, explore works from emerging authors,
        or simply learn more about the literary world, our website is designed
        to make it easy and enjoyable.
      </p>

      <h2 style={{ marginTop: '2rem', fontSize: '1.5rem' }}>Our Mission</h2>
      <p style={{ fontSize: '1.1rem', color: '#475569' }}>
        Our mission is to celebrate literature in all its forms. We provide a
        platform where authors can showcase their work and readers can explore
        diverse genres, gain insights into authors' journeys, and keep up with
        the latest book releases. We believe in the power of stories to inspire,
        educate, and entertain.
      </p>

      <h2 style={{ marginTop: '2rem', fontSize: '1.5rem' }}>What We Offer</h2>
      <ul style={{ paddingLeft: '1.2rem', color: '#334155' }}>
        <li>A curated collection of books across multiple genres</li>
        <li>Profiles and interviews with talented authors</li>
        <li>Reviews and recommendations from our community</li>
        <li>Easy navigation to explore books, authors, and new releases</li>
        <li>Resources for both casual readers and avid bibliophiles</li>
      </ul>

      <p style={{ fontSize: '1.1rem', marginTop: '2rem', color: '#475569' }}>
        We’re committed to fostering a vibrant, welcoming space for everyone who
        loves books. Dive in, explore, and join us in celebrating the world of
        literature!
      </p>
    </div>
  )
}
