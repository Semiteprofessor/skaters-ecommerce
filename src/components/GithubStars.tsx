import Link from 'next/link'

import { Badge } from '@/components/ui/Badge'
import { Icons } from '@/components/Icons'

const GithubStars = async () => {
  async function getGithubStars(): Promise<number | null> {
    try {
      const response = await fetch(
        'https://api.github.com/repos/inifarhan/skaters',
        {
          headers: {
            Accept: 'application/vnd.github+json',
          },
          next: {
            revalidate: 60,
          },
        },
      )

      if (!response.ok) {
        return null
      }

      const data = (await response.json()) as { stargazers_count: number }

      return data.stargazers_count
    } catch (err) {
      console.error(err)
      return null
    }
  }

  const githubStars = await getGithubStars()
