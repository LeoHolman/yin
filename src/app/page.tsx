import Image from 'next/image';
import jojo from '@/app/assets/images/jojo_home.png';
import Link from 'next/link';
import styles from './page.module.scss';

export default function Home() {
  return (
    <main
      id='main'
      className='classroom'
    >
      <section className={styles.introWrapper}>
        <div className={styles.textContent}>
          <h1 className={styles.title}>Welcome to Yin!</h1>
          <p id='summary'>
            Yin a tool to aid learners of lexical tone. Yin is designed to
            supplement activities in the classroom. Teachers can create lessons
            to correspond with classroom curriculum, upload audio for vocabulary
            lists, and add quizzes to test their students. Students can practice
            the words they&apos;ll actually need to know for class, and take
            quizzes at their convenience. Independent learners (not using Yin as
            part of a class) can use the tone graph tool to practice and refine
            their pronunciation.
          </p>
        </div>
        <Image
          src={jojo}
          alt='Jojo Image'
          className={styles.jojoImage}
        />
      </section>
      <nav className={styles.nav}>
        <Link
          className={styles.navLink}
          href='/lessons/'
        >
          STUDENTS
        </Link>
        <Link
          className={styles.navLink}
          href='/teacherInterface/'
        >
          TEACHERS
        </Link>
      </nav>
      <div className={styles.background}></div>
    </main>
  );
}
