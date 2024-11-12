import React from 'react';
import { UserProfile } from '../types';
import { Plus, Trash } from 'lucide-react';

interface ProfileFormProps {
  profile: UserProfile;
  setProfile: (profile: UserProfile) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ profile, setProfile }) => {
  const addExperience = () => {
    setProfile({
      ...profile,
      experience: [
        ...profile.experience,
        { title: '', company: '', description: '', duration: '' }
      ]
    });
  };

  const addEducation = () => {
    setProfile({
      ...profile,
      education: [
        ...profile.education,
        { degree: '', school: '', fieldOfStudy: '', graduationYear: '' }
      ]
    });
  };

  const removeExperience = (index: number) => {
    setProfile({
      ...profile,
      experience: profile.experience.filter((_, i) => i !== index)
    });
  };

  const removeEducation = (index: number) => {
    setProfile({
      ...profile,
      education: profile.education.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Basic Information</h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Full Name"
            value={profile.fullName}
            onChange={(e) =>
              setProfile({ ...profile, fullName: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="email"
            placeholder="Email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Location"
            value={profile.location}
            onChange={(e) =>
              setProfile({ ...profile, location: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </section>

      {/* Experience */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Experience</h2>
          <button
            onClick={addExperience}
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </button>
        </div>
        {profile.experience.map((exp, index) => (
          <div key={index} className="space-y-3 p-4 bg-white rounded-lg shadow">
            <div className="flex justify-between">
              <h3 className="font-medium">Experience {index + 1}</h3>
              <button
                onClick={() => removeExperience(index)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Job Title"
              value={exp.title}
              onChange={(e) => {
                const newExp = [...profile.experience];
                newExp[index].title = e.target.value;
                setProfile({ ...profile, experience: newExp });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Company"
              value={exp.company}
              onChange={(e) => {
                const newExp = [...profile.experience];
                newExp[index].company = e.target.value;
                setProfile({ ...profile, experience: newExp });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            <textarea
              placeholder="Description"
              value={exp.description}
              onChange={(e) => {
                const newExp = [...profile.experience];
                newExp[index].description = e.target.value;
                setProfile({ ...profile, experience: newExp });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows={3}
            />
            <input
              type="text"
              placeholder="Duration (e.g., 2019-2021)"
              value={exp.duration}
              onChange={(e) => {
                const newExp = [...profile.experience];
                newExp[index].duration = e.target.value;
                setProfile({ ...profile, experience: newExp });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Education</h2>
          <button
            onClick={addEducation}
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </button>
        </div>
        {profile.education.map((edu, index) => (
          <div key={index} className="space-y-3 p-4 bg-white rounded-lg shadow">
            <div className="flex justify-between">
              <h3 className="font-medium">Education {index + 1}</h3>
              <button
                onClick={() => removeEducation(index)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => {
                const newEdu = [...profile.education];
                newEdu[index].degree = e.target.value;
                setProfile({ ...profile, education: newEdu });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="School"
              value={edu.school}
              onChange={(e) => {
                const newEdu = [...profile.education];
                newEdu[index].school = e.target.value;
                setProfile({ ...profile, education: newEdu });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Field of Study"
              value={edu.fieldOfStudy}
              onChange={(e) => {
                const newEdu = [...profile.education];
                newEdu[index].fieldOfStudy = e.target.value;
                setProfile({ ...profile, education: newEdu });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Graduation Year"
              value={edu.graduationYear}
              onChange={(e) => {
                const newEdu = [...profile.education];
                newEdu[index].graduationYear = e.target.value;
                setProfile({ ...profile, education: newEdu });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Skills</h2>
        <textarea
          placeholder="Enter your skills (comma-separated)"
          value={profile.skills.join(', ')}
          onChange={(e) =>
            setProfile({
              ...profile,
              skills: e.target.value.split(',').map((s) => s.trim())
            })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          rows={4}
        />
      </section>
    </div>
  );
};

export default ProfileForm;