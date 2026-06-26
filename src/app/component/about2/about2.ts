import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNavbar } from "../main-navbar/main-navbar";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { BackApi } from '../../services/back-api';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule, MainNavbar, RouterModule],
  templateUrl: './about2.html',
  styleUrl: './about2.css'
})
export class About2 implements OnInit {
  departmentName: string = '';
  doctors: any[] = [];
  departmentDescription: any = null;
  loading = true;
  services: any[] = [];
  faqs: any[] = [];
  reasons: any[] = [];
  activeFaqIndex: number | null = null;

  readonly defaultImage =
    'https://static.vecteezy.com/system/resources/previews/026/375/249/non_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg';

  constructor(
    private api: BackApi,
    private routes: Router,
    private activate: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activate.paramMap.subscribe(params => {
      this.departmentName = params.get('id') || '';
      if (this.departmentName) {
        this.loadDoctors();
        this.loadDepartmentDescription();
        this.loadDepartmentContent();
      }
    });
  }

  loadDepartmentDescription() {
    this.api.getDepartmentDescriptionByDepartmentName(this.departmentName).subscribe({
      next: (found: any) => {
        this.departmentDescription = found;
      },
      error: (err) => {
        console.error('Error loading department description:', err);
      }
    });
  }

  loadDoctors() {
    this.loading = true;
    this.api.getdepartment(this.departmentName).subscribe({
      next: (res: any) => {
        const raw: any[] = Array.isArray(res.data) ? res.data : (res.data ? [res.data] : []);
        this.doctors = raw.map(doc => ({
          ...doc,
          image: this.resolveImage(doc.image)
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading doctors for department:', err);
        this.loading = false;
      }
    });
  }

  resolveImage(path: string): string {
    if (!path) return this.defaultImage;
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    return `http://localhost:4065/${path}`;
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = this.defaultImage;
  }

  viewDoctor(id: string) {
    this.routes.navigate(['/doctor', id], {
      queryParams: { canBook: 'false' }
    });
  }

  getDepartmentIcon(name: string): string {
    const n = (name || '').toLowerCase();
    if (n.includes('cardio') || n.includes('heart')) return '❤️';
    if (n.includes('neuro') || n.includes('brain')) return '🧠';
    if (n.includes('ortho') || n.includes('bone')) return '🦴';
    if (n.includes('pediatr') || n.includes('child')) return '👶';
    if (n.includes('oncol') || n.includes('cancer')) return '🎗️';
    if (n.includes('derma') || n.includes('skin')) return '🩺';
    if (n.includes('ophthal') || n.includes('eye')) return '👁️';
    if (n.includes('dental') || n.includes('teeth')) return '🦷';
    if (n.includes('gynec') || n.includes('obstet')) return '🌸';
    if (n.includes('pulmon') || n.includes('lung') || n.includes('respir')) return '🫁';
    if (n.includes('gastro') || n.includes('digest')) return '🔬';
    if (n.includes('uro') || n.includes('kidney')) return '🔬';
    if (n.includes('endo') || n.includes('diabetes')) return '💉';
    if (n.includes('psych') || n.includes('mental')) return '🧘';
    if (n.includes('emergency') || n.includes('trauma')) return '🚑';
    return '🏥';
  }

  toggleFaq(index: number) {
    this.activeFaqIndex = this.activeFaqIndex === index ? null : index;
  }

  scrollToTeam() {
    const element = document.getElementById('specialist-team');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  loadDepartmentContent() {
    // Normalize Typo: Neurology -> Neurology
    if (this.departmentName.toLowerCase().includes('neurology')) {
      this.departmentName = 'Neurology';
    }

    const n = (this.departmentName || '').toLowerCase();

    // Default Reasons for "Why Choose Us"
    let defaultReasons = [
      { title: 'Expert Doctors', text: 'Our team consists of world-class specialists with years of experience.', icon: '👨‍⚕️' },
      { title: 'Modern Facilities', text: 'Equipped with the latest medical technology for precise diagnosis.', icon: '🏢' },
      { title: 'Patient-Centric Care', text: 'We prioritize your comfort and well-being at every step.', icon: '❤️' }
    ];

    // Default Services & FAQs
    let defaultServices = [
      { title: 'General Consultation', description: 'Comprehensive health check-ups and expert medical advice.', icon: '🩺' },
      { title: 'Diagnostic Imaging', description: 'State-of-the-art X-rays, MRIs, and CT scans.', icon: '📸' },
      { title: 'Emergency Care', description: '24/7 immediate medical attention for critical cases.', icon: '🚑' },
      { title: 'Laboratory Services', description: 'Fast and accurate testing for various medical conditions.', icon: '🧪' }
    ];

    let defaultFaqs = [
      { question: 'What should I bring to my first appointment?', answer: 'Please bring your ID, insurance card, and any previous medical records or test results.' },
      { question: 'How do I book a follow-up visit?', answer: 'You can book follow-up visits through our portal or by calling the front desk after your consultation.' },
      { question: 'Is telemedicine available?', answer: 'Yes, we offer virtual consultations for several departments. Please check with your doctor.' },
      { question: 'What are your insurance policies?', answer: 'We accept most major insurance providers. Please contact our billing office for specific details.' }
    ];

    if (n.includes('cardio')) {
      this.reasons = [
        { title: 'Advanced Labs', text: 'State-of-the-art cardiac catheterization and imaging labs.', icon: '🫀' },
        { title: 'Rapid Response', text: 'Specialized 24/7 emergency protocol for cardiac events.', icon: '⚡' },
        { title: 'Holistic Recovery', text: 'Integrated rehabilitation plans for long-term heart health.', icon: '☘️' }
      ];
      this.services = [
        { title: 'Angiography', description: 'Precise imaging of blood vessels to detect blockages.', icon: '❤️' },
        { title: 'Heart Valve Surgery', description: 'Advanced surgical procedures for valve repair or replacement.', icon: '⚔️' },
        { title: 'Cardiac Rehabilitation', description: 'Personalized programs to strengthen your heart after surgery.', icon: '🏃' },
        { title: 'Electrophysiology', description: 'Specialized testing for heart rhythm disorders.', icon: '⚡' }
      ];
      this.faqs = [
        { question: 'When should I see a cardiologist?', answer: 'Consult a cardiologist if you experience chest pain, shortness of breath, or have a family history of heart disease.' },
        { question: 'What is an EKG?', answer: 'An electrocardiogram (EKG) records the electrical signals in your heart to check for rhythm issues.' },
        { question: 'Is heart disease preventable?', answer: 'Many heart conditions can be prevented through a healthy diet, regular exercise, and regular check-ups.' }
      ];
    } else if (n.includes('neuro')) {
      this.reasons = [
        { title: 'Neuro-Tech', text: 'Cutting-edge brain mapping and diagnostic equipment.', icon: '🧬' },
        { title: 'Stroke Center', text: 'Certified comprehensive stroke center with immediate response.', icon: '🧠' },
        { title: 'Minimally Invasive', text: 'Advanced neurosurgery options with faster recovery times.', icon: '🔬' }
      ];
      this.services = [
        { title: 'Neurological Exam', description: 'Detailed evaluation of sensory and motor skills.', icon: '🧠' },
        { title: 'EEG Testing', description: 'Monitoring brain activity to diagnose seizures and other issues.', icon: '📉' },
        { title: 'Stroke Management', description: 'Immediate and long-term care for stroke patients.', icon: '🚑' },
        { title: 'Sleep Disorder Clinic', description: 'Diagnostic services for insomnia and sleep apnea.', icon: '😴' }
      ];
      this.faqs = [
        { question: 'What symptoms indicate a neurological issue?', answer: 'Persistent headaches, numbness, dizziness, and muscle weakness are signs to consult a neurologist.' },
        { question: 'Are neurological conditions hereditary?', answer: 'Some conditions like Alzheimers or epilepsy can have genetic factors, but many are not.' }
      ];
    } else if (n.includes('ortho')) {
      this.reasons = [
        { title: 'Robotic Surgery', text: 'High-precision robotic-assisted joint replacement options.', icon: '🤖' },
        { title: 'Sports Medicine', text: 'Trusted by professional athletes for injury recovery.', icon: '🏅' },
        { title: 'Physiotherapy', icon: '🤲', text: 'On-site advanced physical therapy and rehabilitation wing.' }
      ];
      this.services = [
        { title: 'Joint Replacement', description: 'Modern surgical solutions for hip, knee, and shoulder pain.', icon: '🦴' },
        { title: 'Sports Medicine', description: 'Treating athletic injuries and improving physical performance.', icon: '⚽' },
        { title: 'Spine Care', description: 'Comprehensive treatment for back and neck pain.', icon: '🦒' },
        { title: 'Fracture Treatment', description: 'Expert care for broken bones and orthopedic trauma.', icon: '🔨' }
      ];
      this.faqs = [
        { question: 'How long is the recovery after joint surgery?', answer: 'Recovery varies but usually takes 6-12 weeks with physical therapy.' },
        { question: 'When should I consider knee replacement?', answer: 'When pain limits daily activities and conservative treatments no longer provide relief.' }
      ];
    } else if (n.includes('oncol') || n.includes('cancer')) {
      this.reasons = [
        { title: 'Multidisciplinary', text: 'Team of oncologists, radiologists, and surgeons working together.', icon: '🤝' },
        { title: 'Latest Research', text: 'Access to the newest clinical trials and treatment protocols.', icon: '📖' },
        { title: 'Compassionate Care', text: 'Supportive services for emotional and physical well-being.', icon: '🎗️' }
      ];
      this.services = [
        { title: 'Chemotherapy', description: 'Advanced infusion services in a comfortable environment.', icon: '🧪' },
        { title: 'Radiation Therapy', description: 'Precision-targeted radiation to shrink tumors.', icon: '☢️' },
        { title: 'Genetic Testing', description: 'Identifying genetic markers for personalized treatment.', icon: '🧬' },
        { title: 'Palliative Care', description: 'Focusing on quality of life and symptom management.', icon: '🫂' }
      ];
      this.faqs = [
        { question: 'What is personalized medicine?', answer: 'It is a treatment approach that uses your genetic profile to tailor medical care specifically for you.' },
        { question: 'How do I manage treatment side effects?', answer: 'Our support team provides specialized nutrition, medication, and lifestyle advice to help you cope.' }
      ];
    } else if (n.includes('ophthal') || n.includes('eye')) {
      this.reasons = [
        { title: 'LASIK Experts', text: 'Pioneers in laser eye surgery with high success rates.', icon: '👁️' },
        { title: 'Advanced Imaging', text: 'Ultra-high resolution scans of the retina and optic nerve.', icon: '🔬' },
        { title: 'Optical Shop', text: 'Wide range of corrective eyewear and lenses on-site.', icon: '👓' }
      ];
      this.services = [
        { title: 'Cataract Surgery', description: 'Modern lens replacement for clear, vibrant vision.', icon: '👁️' },
        { title: 'Glaucoma Treatment', description: 'Medical and surgical options to manage eye pressure.', icon: '🩺' },
        { title: 'Retinal Care', description: 'Treatment for macular degeneration and diabetic retinopathy.', icon: '🔦' },
        { title: 'Pediatric Eye Care', description: 'Specialized vision services for infants and children.', icon: '👶' }
      ];
      this.faqs = [
        { question: 'How often should I have an eye exam?', answer: 'Adults should have a comprehensive eye exam every 1-2 years, or as recommended by a doctor.' },
        { question: 'Is LASIK surgery painful?', answer: 'The procedure is generally painless as numbing drops are used; most experience only mild pressure.' }
      ];
    } else if (n.includes('pediatr')) {
      this.reasons = [
        { title: 'Child-Friendly', text: 'Environment designed specifically to reduce anxiety in children.', icon: '🎨' },
        { title: 'Growth Tracking', text: 'Advanced digital systems to monitor developmental milestones.', icon: '📈' },
        { title: 'On-Call Nurses', text: 'After-hours nursing line for parent guidance and emergencies.', icon: '📞' }
      ];
      this.services = [
        { title: 'Well-Child Visits', description: 'Regular check-ups to monitor growth and development.', icon: '👶' },
        { title: 'Immunizations', description: 'Protecting children from serious diseases with scheduled vaccines.', icon: '💉' },
        { title: 'Pediatric Emergency', description: 'Specialized urgent care designed specifically for children.', icon: '🧸' },
        { title: 'Nutritional Counseling', description: 'Guidance on healthy eating habits for children and teens.', icon: '🍎' }
      ];
      this.faqs = [
        { question: 'At what age should my child first see a dentist?', answer: 'We recommend the first visit by their first birthday or when their first tooth appears.' },
        { question: 'How often should my child have a check-up?', answer: 'Infants need frequent visits, while older children usually need an annual physical.' }
      ];
    } else {
      this.reasons = defaultReasons;
      this.services = defaultServices;
      this.faqs = defaultFaqs;
    }
  }
}
