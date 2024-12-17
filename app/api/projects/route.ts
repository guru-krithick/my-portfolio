import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Project } from '@/lib/models/project'

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase()
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '8')

    const query = search ? { title: { $regex: search, $options: 'i' } } : {}
    const skip = (page - 1) * limit

    const projects = await Project.find(query)
      .skip(skip)
      .limit(limit)

    const totalProjects = await Project.countDocuments(query)
    const totalPages = Math.ceil(totalProjects / limit)

    return NextResponse.json({ projects, totalPages })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase()
    const data = await req.json()
    const newProject = new Project(data)
    const savedProject = await newProject.save()
    return NextResponse.json(savedProject, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

