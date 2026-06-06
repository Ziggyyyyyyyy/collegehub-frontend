'use client';

import { useState } from 'react';
import Link from 'next/link';
import { COLLEGES } from '@/data/colleges';
import { Container } from '@/components/layout/container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PredictorPage() {
  const [exam, setExam] = useState('JEE Advanced');
  const [rank, setRank] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const predictColleges = () => {
    const userRank = Number(rank);

    let recommended = [];

    if (userRank <= 1000) {
      recommended = COLLEGES.filter((c) => c.ranking <= 3);
    } else if (userRank <= 3000) {
      recommended = COLLEGES.filter((c) => c.ranking <= 5);
    } else {
      recommended = COLLEGES.filter((c) => c.ranking <= 6);
    }

    setResults(recommended);
  };

  return (
    <Container className="py-12">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-5xl font-bold mb-2">
          College Predictor
        </h1>

        <p className="text-text-secondary mb-8">
          Enter your exam and rank to get recommended colleges.
        </p>

        <Card>
          <CardContent className="p-6 space-y-4">

            <div>
              <label className="block mb-2 font-medium">
                Exam
              </label>

              <select
                value={exam}
                onChange={(e) => setExam(e.target.value)}
                className="w-full border rounded-lg p-3"
              >
                <option>JEE Advanced</option>
                <option>JEE Main</option>
                <option>GATE</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Rank
              </label>

              <input
                type="number"
                placeholder="Enter your rank"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <Button
              className="w-full"
              onClick={predictColleges}
            >
              Predict Colleges
            </Button>

          </CardContent>
        </Card>

        {results.length > 0 && (
          <div className="mt-8 space-y-4">

            <h2 className="text-2xl font-semibold">
              Recommended Colleges
            </h2>

            {results.map((college) => (
              <Card key={college.id}>
                <CardContent className="p-5">

                  <div className="flex justify-between items-start">

                    <div>
                      <h3 className="font-bold text-lg">
                        {college.name}
                      </h3>

                      <p className="text-text-secondary">
                        {college.location}
                      </p>

                      <p className="mt-2">
                        ⭐ {college.rating}
                      </p>
                    </div>

                    <Link href={`/colleges/${college.id}`}>
                      <Button>
                        View College
                      </Button>
                    </Link>

                  </div>

                </CardContent>
              </Card>
            ))}

          </div>
        )}

      </div>
    </Container>
  );
}